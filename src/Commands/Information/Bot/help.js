const ParseTime = require("../../../Assets/ParseTime.js");
module.exports = class Help extends (
  require("../../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "help",
      category: "information",
      usage: "{co} <command>",
      aliases: ["h", "commands", "?"],
      botPerms: ["EMBED_LINKS"],
    });
  }
  run({ message, client, args }) {
    if (!args[0]) {
      var embed = {
        title: `${client.user.username}'s Commands! (${client.commands.size})`,
        fields: [],
        footer: {
          text: `Prefix: ${client.config.prefix}`,
        },
      };
      var groups = [];
      for (var command of client.commands) {
        command = command[1];
        if (
          !groups.includes(command.help.category.toLowerCase()) &&
          command.config.enabled
        ) {
          groups.push(command.help.category.toLowerCase());
        }
      }
      for (const group of groups.sort()) {
        if (
          group === "developer" &&
          !client.config.developers.includes(message.author.id)
        )
          return;
        embed.fields.push({
          name:
            group.split("")[0].toUpperCase() +
            group.split("").slice(1).join(""),
          value: `\`${client.commands
            .filter(
              (c) => c.help.category.toLowerCase() === group && c.config.enabled
            )
            .map((c) => c.help.name)
            .join("`, `")}\``,
        });
      }
      return { embed };
    } else {
      const Command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.get(client.aliases.get(args[0].toLowerCase()));
      return {
        embed: {
          title:
            Command.help.name.split("")[0].toUpperCase() +
            Command.help.name.slice(1).toLowerCase(),
          fields: [
            { name: "Description", value: Command.help.description },
            {
              name: "Usage",
              value: Command.help.usage.replace(
                "{co}",
                `${client.config.prefix}${Command.help.name}`
              ),
            },
            {
              name: "Aliases",
              value:
                Command.config.aliases.length === 0
                  ? "None"
                  : `\`${Command.config.aliases.join("`, `")}\``,
            },
            {
              name: "Cooldown",
              value:
                Command.config.cooldown === 0
                  ? "None"
                  : `\`${ParseTime(Command.config.cooldown)}\``,
            },
          ],
        },
      };
    }
  }
};
