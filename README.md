# Bot for rpg things? idk

## Running the bot
  - You need to create two configuration files, `dev.config.json` and `prod.config.json`
  - Inside of those configuration files you will put 
```json {
    "token": "BotToken",
    "mongoUrl": "MongoConnectionURL",
    "prefix": "!",
    "developer": ["userID"]
}
```
  - To start the bot you can use `node index.js`, use the `--dev` argument to use the development configuration