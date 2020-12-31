const { Message } = require("discord.js");

module.exports = class Ping extends (
  require("../../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "ping",
      category: "information",
      description: "View the bots ping!",
      botPerms: ["EMBED_LINKS"],
    });
  }
  run({ client, message }) {
    return {
      embed: { description: `⏳ ${Date.now() - message.createdTimestamp} ms` },
    };
  }
};
