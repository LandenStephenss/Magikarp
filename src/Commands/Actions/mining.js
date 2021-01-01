const {
  mining: { itemList },
} = require("../../Assets/Items.json");
const {
  numberBetween,
  databaseUtil: { addToInventory, addExp, addGold },
} = require("../../Assets/util.js");
module.exports = class Mining extends (
  require("../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "mining",
      description: "Go mining to get ores and gold",
      cooldown: 900000,
      category: "actions",
      aliases: ["mn", "mine"],
    });
  }
  async run({ client, message }) {
    message.channel.send("lets go on an adventure f*ck face");
    // db things, although xp is not getting rewarded yet
    var oreCollected = numberBetween(5, 25);
    var goldFound = numberBetween(5, 25);
    var exp = numberBetween(5, 25);
    var typeOf = itemList[Math.floor(Math.random() * itemList.length)];
      await addToInventory(client.userDB, message.author, typeOf, oreCollected);
      await addGold(client.userDB, message.author, goldFound);
      await addExp(client.userDB, message.author, exp);
      message.channel.send({
        embed: {
          author: {
            name: `${message.author.tag}'s Adventure`,
            icon_url: message.author.displayAvatarURL(),
          },
          fields: [
            {
              name: "Gold",
              value: goldFound,
            },
            {
              name:
                typeOf.split("")[0].toUpperCase() +
                typeOf.slice(1).toLowerCase(),
              value: oreCollected,
            },
            { name: "EXP", value: exp },
          ],
          color: 14677957,
        },
      });
  }
};
