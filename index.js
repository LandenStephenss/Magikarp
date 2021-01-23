const ClientStructure = require("./src/Structures/Client.js");
const Client = new ClientStructure();
const { readdir } = require("fs");
Client.init();

readdir("./src/Commands", (err, files) => {
  if (err) {
    return console.error(err);
  }
  for (const command of files) {
    Client.loadCommand(command);
  }
});

readdir("./src/Events", (err, files) => {
  if (err) return console.error(err);
  for (const eventFile of files) {
    const event = new (require(`./src/Events/${eventFile}`))(Client);
    Client.on(eventFile.match("[^.]*")[0], (...args) => {
      event.run(...args);
    });
  }
});

Client.login(Client.config.token);
