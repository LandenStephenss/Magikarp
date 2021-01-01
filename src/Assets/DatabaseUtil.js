module.exports = {
  addCooldown: async (db, user, Command) => {
    var { cooldowns: userCooldown } = await db.findOne({
      _id: user.id,
    });
    if (!userCooldown.filter((f) => f[0] === Command.help.name)[0]) {
      userCooldown.push([
        Command.help.name,
        Date.now() + Command.config.cooldown,
      ]);
      db.updateOne({ _id: user.id }, { $set: { cooldowns: userCooldown } });
    } else {
      userCooldown[
        userCooldown.indexOf(
          userCooldown.filter((f) => f[0] === Command.help.name)[0]
        )
      ] = [Command.help.name, Date.now() + Command.config.cooldown];
      db.updateOne({ _id: user.id }, { $set: { cooldowns: userCooldown } });
    }
  },
  fetchCooldown: (db, user, command) => {},
  fetchInventory: async (db, user) => {
    var { inventory } = await db.findOne({ _id: user.id });
    return inventory;
  },
  addToInventory: async (db, user, item, amount) => {
    var { inventory } = await db.findOne({ _id: user.id });
    if (inventory.filter((f) => f[0] === item).length == 0) {
      inventory.push([item, amount]);
      await db.updateOne({ _id: user.id }, { $set: { inventory: inventory } });
    } else {
      var itemToChange = inventory.filter((f) => f[0] === item)[0];
      inventory[inventory.indexOf(itemToChange)] = [
        itemToChange[0],
        itemToChange[1] + amount,
      ];
      await db.updateOne({ _id: user.id }, { $set: { inventory: inventory } });
    }
  },
  addGold: async (db, user, amount) => {
    var { gold: currentGold } = await db.findOne({ _id: user.id });
    currentGold = currentGold + amount;
    await db.updateOne({ _id: user.id }, { $set: { gold: currentGold } });
  },
  fetchGold: async (db, user) => {
    var { gold } = await db.findOne({ _id: user.id });
    return gold;
  },
  addExp: (db, user, amount) => {},
};
