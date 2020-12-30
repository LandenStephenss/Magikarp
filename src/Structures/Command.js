module.exports = class Command {
  constructor({
    name = "Command",
    description = "None Given!",
    usage = "{co}",
    category = "misc",
    timesUsed = 0,
    cooldown = 3000, // in ms
    aliases = new Array(),
    botPerms = new Array().concat("SEND_MESSAGES"),
    userPerms = new Array(),
    developer = false,
    enabled = true,
    dmEnabled = true,
  }) {
    this.help = { name, description, usage, category, timesUsed };
    this.config = {
      aliases,
      botPerms,
      userPerms,
      developer,
      enabled,
      cooldown,
      dmEnabled,
      filePath: null,
    };
  }
};
