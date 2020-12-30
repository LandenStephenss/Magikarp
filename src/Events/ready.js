module.exports = class Ready {
  constructor(client) {
    this.client = client;
  }

  run() {
    this.client.logger.info(`${this.client.user.tag} is online!`);
    this.client.logger.info(
      `${this.client.guilds.cache.size} Guilds, ${this.client.users.cache.size} Users, ${this.client.commands.size} Commands!`
    );

  }
};
