const {
  mining: { itemList },
} = require("../../Assets/Items.json");
module.exports = class Mining extends (
  require("../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "mining",
      description: "Go mining to get ores and gold",
      cooldown: 3600,
      category: "actions",
    });
  }
  run({ client, message }) {
    message.channel.send("lets go on an adventure f*ck face");
    var oreCollected = Math.floor(Math.random() * 25);
    var goldFound = Math.floor(Math.random() * 25);
    var exp = Math.floor(Math.random() * (oreCollected + goldFound));
    var typeOf = itemList[Math.floor(Math.random() * itemList.length)];

    setTimeout(() => {
      message.channel.send({
        embed: {
          author: {
            name: `${message.author.tag}'s Adventure`,
            icon_url: message.author.displayAvatarURL(),
          },
          fields: [
            {
              name:
                typeOf.split("")[0].toUpperCase() +
                typeOf.slice(1).toLowerCase(),
              value: goldFound,
            },
            { name: "Ore", value: oreCollected },
            { name: "EXP", value: exp },
          ],
          color: 14677957,
        },
      });
    }, 60000);

    // do some db bullshits, message handler will take care of cooldown because its cool like that
  }
};
