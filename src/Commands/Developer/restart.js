const { Message } = require("discord.js");

module.exports = class extends (
  require("../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "restart",
      description: "restart the bot",
      category: "development",
      developer: true,
    });
  }
  run({ message }) {
    message.channel.send("Restarting...");
    process.exit(0);
  }
};
