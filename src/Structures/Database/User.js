module.exports = (user) => {
  return {
    _id: user.id,
    skills: {
      wood: {
        level: 0,
        exp: 0,
      },
      mining: {
        level: 0,
        exp: 0,
      },
      fishing: {
        level: 0,
        exp: 0,
      },
    },
    ovLevel: 0,
    gold: 0,
    inventory: [],
    cooldowns: [],
  };
};

// Cooldown examples
var cooldownExample = [["commandName", `${Date.now() + cooldown}`]];

// Eventory examples;
var example = [
  ["LOG", 32],
  ["EMERALD_SWORD", 2],
];
// Diagram
var diagram = [
  [
    ,/* ITEM NAME */
  /* AMOUNT OF ITEM */
  ],
];

/*
    Items can be managed using some array trickery, although im not sure how easy it will be to manage and display the items. Time will tell
*/
