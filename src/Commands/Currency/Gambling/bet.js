module.exports = class extends (
  require("../../../Structures/Command")
) {
  constructor() {
    super({
      name: "bet",
      cooldown: 600000, //600000,
      category: "currency",
      description: "Bet your gold!",
    });
  }

  async run({ message, client, args }) {
    if (!args[0] || isNaN(args[0])) {
      return "Can you give an amount to bet, thanks.";
    } else if (parseInt(args[0]) < 10) {
      return "Your bet has to be atleast 10 gold.";
    } else {
      var bet = parseInt(args[0]);
      var roll = Math.floor(Math.random() * 6);
      if (roll % 2 == 0) {
        var { gold } = await client.userDB.findOne({ _id: message.author.id });
        await client.userDB.updateOne(
          { _id: message.author.id },
          { $set: { gold: gold - bet + bet * 2 } }
        );
        gold = gold - bet + bet * 2;

        return `You rolled a ${roll} and won ${
          bet * 2
        } gold.\nYour total gold is now ${gold}`;
      } else {
        var { gold } = await client.userDB.findOne({ _id: message.author.id });
        await client.userDB.updateOne(
          { _id: message.author },
          { $set: { gold: gold - bet } }
        );
        return `You rolled a ${roll} and lost ${bet} gold.\nYour total gold is now ${
          gold - bet
        }`;
      }
    }
  }
};
