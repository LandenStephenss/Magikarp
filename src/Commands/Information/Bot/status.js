const moment = require("moment");
require("moment-duration-format");
const FormatNumber = require("../../../Assets/FormatNumber.js");
module.exports = class Status extends (
  require("../../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "status",
      description: "View the bot's status",
      category: "information",
      aliases: ["stats", "statistics"],
      botPerms: ["EMBED_LINKS"],
    });
  }
  run({ client }) {
    return {
      embed: {
        author: {
          name: client.user.tag,
          icon_url: client.user.displayAvatarURL(),
        },
        fields: [
          {
            name: "Guilds",
            value: FormatNumber(client.guilds.cache.size),
            inline: true,
          },
          {
            name: "Users",
            value: FormatNumber(client.users.cache.size),
            inline: true,
          },
          {
            name: "Memory Usage",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )} MB`,
            inline: true,
          },
          {
            name: "Uptime",
            value: moment
              .duration(Math.floor(process.uptime() * 1000))
              .format("D [days], H [hours], m [minutes]"),
            inline: true,
          },
        ],
      },
    };
  }
};
