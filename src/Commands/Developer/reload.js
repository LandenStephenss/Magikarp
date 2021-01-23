module.exports = class extends (
  require("../../Structures/Command")
) {
  constructor() {
    super({
      name: "reload",
      developer: true,
      cooldown: 0,
      category: "development",
    });
  }
  run({ client, message, args }) {
    if (!args[0]) {
      return "Lol can you give me a command to reload";
    } else {
      const command =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));
      if (!command)
        return `Command \`${args[0].toLowerCase()}\` does not exist`;
      this.reload(command, client);
      return `Reloading \`${command.help.name}\`...`;
    }
  }

  reload(command, client) {
    return new Promise((resolve, reject) => {
      var { filePath } = command.config;
      try {
        delete require.cache[require.resolve(`../${filePath}`)];
        client.commands.delete(command.help.name);
        client.aliases.forEach((alias) => {
          if (alias === command) client.aliases.delete(alias);
        });
        var newCommand = new (require(`../${filePath}`))();
        newCommand.config.filePath = filePath;
        client.commands.set(newCommand.help.name, newCommand);
        newCommand.config.aliases.forEach((alias) => {
          client.aliases.set(alias, newCommand.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
};
