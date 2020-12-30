const DBUser = require("../Structures/Database/User.js");
const ParseTime = require("../Assets/ParseTime.js");
module.exports = class Message {
  constructor(client) {
    this.client = client;
  }
  async run(message) {
    if (message.author.bot) return;

    if (
      await this.client.userDB
        .countDocuments({ _id: message.author.id }, { limit: 1 })
        .then((r) => r === 0)
    ) {
      await this.client.userDB.insertOne(DBUser(message.author));
      this.client.logger.debug(
        `${message.author.tag} has been added to the database`
      );
    }

    const { prefix } = this.client.config;
    // Command Handling;
    if (message.content.startsWith(prefix)) {
      var Command = message.content
        .split(" ")[0]
        .slice(prefix.length)
        .toLowerCase();
      const Args = message.content.split(" ").slice(1);
      if (
        this.client.commands.has(Command) ||
        this.client.aliases.has(Command)
      ) {
        Command =
          this.client.commands.get(Command) ||
          this.client.commands.get(this.client.aliases.get(Command));
        var { cooldowns: userCooldown } = await this.client.userDB.findOne({
          _id: message.author.id,
        });

        if (
          userCooldown.filter((f) => f[0] === Command.help.name)[0] !==
            undefined &&
          userCooldown.filter((f) => f[0] === Command.help.name)[0][1] >
            Date.now()
        ) {
          const waitTime =
            (userCooldown.filter((f) => f[0] === Command.help.name)[0][1] -
              Date.now()) /
            1000;

          return message.channel.send(
            `Stop spamming commands! You have \`${ParseTime(
              waitTime
            )}\` until you can use that command again.`
          );
        }
        if (
          Command.config.developer &&
          !this.client.config.developers.includes(message.author.id)
        ) {
          return message.channel.send({
            embed: {
              title: "You must be a developer to run this command!",
              color: 14677957,
            },
          });
        } else if (!Command.config.enabled) {
          return;
        } else if (!Command.config.dmEnabled && message.channel.type === "dm") {
          return;
        } else if (
          !Command.config.botPerms.every((perm) =>
            message.guild.member(this.client.user).hasPermission(perm)
          )
        ) {
          message.channel.send(
            `I require \`${Command.config.botPerms
              .filter(
                (perm) =>
                  !message.guild.member(this.client.user).hasPermission(perm)
              )
              .map((r) => r.split("_").join(" "))
              .join("`, `")}\` permissions!`
          );
        } else if (
          !Command.config.userPerms.every((perm) =>
            message.member.hasPermission(perm)
          )
        ) {
          message.channel.send(
            `You require \`${Command.config.userPerms
              .filter((perm) => !message.member.hasPermission(perm))
              .map((r) => r.split("_").join(" "))
              .join("`, `")}\` permissions!`
          );
        } else {
          Command.help.timesUsed++;
          this.client.logger.debug(
            `\u001b[36;1mCommand \u001b[31m${Command.help.name}\u001b[36;1m ran by \u001b[31m${message.author.tag} \u001b[36;1m(\u001b[31m${message.author.id}\u001b[36;1m)\u001b[39m`
          );
          if (Command.config.cooldown > 0) {
            if (!userCooldown.filter((f) => f[0] === Command.help.name)[0]) {
              userCooldown.push([
                Command.help.name,
                Date.now() + Command.config.cooldown,
              ]);
              this.client.userDB.updateOne(
                { _id: message.author.id },
                { $set: { cooldowns: userCooldown } }
              );
            } else {
              userCooldown[
                userCooldown.indexOf(
                  userCooldown.filter((f) => f[0] === Command.help.name)[0]
                )
              ] = [Command.help.name, Date.now() + Command.config.cooldown];
              this.client.userDB.updateOne(
                { _id: message.author.id },
                { $set: { cooldowns: userCooldown } }
              );
            }
          }
          var res = await Command.run({
            client: this.client,
            message,
            args: Args,
          });
          if (res) {
            if (typeof res === "string" || typeof res === "object") {
              if (res.embed && !res.embed.color) {
                res.embed.color = 14677957;
              }
              message.channel.send(res);
            }
          }
        }
      }
    }
  }
};
