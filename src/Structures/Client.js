/*
    420 Blaze it - Oly was here

    RGB Int for SmokeGreen - 14677957
*/
const { Client, Collection } = require("discord.js");
const { MongoClient } = require("mongodb");
const { readdir } = require("fs");
const Logger = require("./Logger.js");
var DEVELOPMENT = process.argv.includes("--dev");

module.exports = class Bot extends (
  Client
) {
  constructor(options = {}) {
    super();
    this.commands = new Collection();
    this.aliases = new Collection();

    this.config = require(`../../${DEVELOPMENT ? "dev" : "prod"}.config.json`);
    this.logger = new Logger();
  }
  init() {
    this.initMongo(this.config.mongoUrl);
  }

  initMongo(uri) {
    MongoClient.connect(uri, { useUnifiedTopology: true }, (err, res) => {
      if (err) return console.error(err);
      this.userDB = res
        .db(DEVELOPMENT ? "MagikarpBeta" : "Magikarp")
        .collection("Users");
    });
  }

  loadCommand(file) {
    if (file.includes(".json")) return;
    if (!file.includes(".js")) {
      readdir(`./src/Commands/${file}`, (err, files) => {
        files.forEach((command) => {
          this.loadCommand(`/${file}/${command}`);
        });
      });
    } else {
      if (file.includes("assets.")) return;
      try {
        const Command = new (require(`../Commands/${file}`))();
        Command.config.filePath = file;
        this.commands.set(Command.help.name, Command);
        for (const alias of Command.config.aliases) {
          this.aliases.set(alias, Command.help.name);
        }
        this.logger.debug(
          `\u001b[38;5;33mCommand \u001b[31m${Command.help.name}\u001b[38;5;33m loaded successfully\u001b[39m`
        );
      } catch (e) {
        console.error(e);
      }
    }
  }
};
