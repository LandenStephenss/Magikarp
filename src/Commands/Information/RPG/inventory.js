const {
  databaseUtil: { fetchInventory, fetchGold },
} = require("../../../Assets/util.js");
module.exports = class Inventory extends (
  require("../../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "inventory",
      description: "View the items in your inventory!",
      botPerms: ["EMBED_LINKS"],
      aliases: ["inv"],
      category: "information",
    });
  }
  async run({ client, message, args }) {
    var inventory = await fetchInventory(client.userDB, message.author);
    var page = args[0] || 0;
    var embed = {
      title: `${message.author.tag}'s Inventory!`,
      fields: [],
      footer: {
        text: `Page ${page + 1}/${Math.ceil(inventory.length / 10)}`,
      },
    };
    if (inventory.length === 0) {
      embed.description = "Nothing in your inventory!";
      return { embed };
    } else {
      var gold = await fetchGold(client.userDB, message.author);
      embed.description = `**Gold**: ${gold}`;
      for (const item of inventory.slice(0, 10)) {
        embed.fields.push({
          name:
            item[0].split("")[0].toUpperCase() + item[0].slice(1).toLowerCase(),
          value: item[1],
        });
      }
      return { embed };
    }
    console.log(inventory);
  }
};
