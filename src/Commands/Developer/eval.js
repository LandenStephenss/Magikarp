const util = require("util");
module.exports = class extends (
  require("../../Structures/Command.js")
) {
  constructor() {
    super({
      name: "eval",
      developer: true,
      description: "Evaluate some code because why not",
      usage: "{c} <code>",
      botPerms: ["EMBED_LINKS"],
      category: "development"
    });
  }
  run({ client, message, args }) {
    if (!args[0]) {
      return "can you give me some code this time";
    } else if (args.join(" ").includes("this.client.token")) {
      message.react("👎");
    } else {
      const code = args.join(" ");
      const startTime = process.hrtime();
      new Promise((r) => r(eval(code)))
        .then(async (evaled) => {
          var type;
          if (evaled !== undefined && typeof evaled.then === "function") {
            evaled = await evaled;
            type = `Promise <${
              evaled != null ? evaled.constructor.name : "void"
            }>`;
          } else {
            type = evaled != null ? evaled.constructor.name : "void";
          }
          if (
            util
              .inspect(evaled, {
                depth: 0,
              })
              .includes(client.token) ||
            util
              .inspect(evaled, {
                depth: 0,
              })
              .includes(client.token.toLowerCase()) ||
            util
              .inspect(evaled, {
                depth: 0,
              })
              .includes(client.token.toUpperCase)
          ) {
            message.channel.send("You can't eval that code!");
          } else {
            const stopTime = process.hrtime(startTime);
            message.channel.send({
              embed: {
                title: `Success || Evaled in ${
                  stopTime[0] > 0 ? `${stopTime[0]}s` : ""
                }${stopTime[1] / 1000000}ms`,
                fields: [
                  {
                    name: "📥 Input:",
                    value: `\`\`\`js\n${code}\`\`\``,
                  },
                  {
                    name: "📤 Output:",
                    value: `\`\`\`js\n${util.inspect(evaled, {
                      compact: true,
                      depth: 0,
                    })}\`\`\``,
                  },
                ],
                footer: {
                  text: `Type: ${type}`,
                },
              },
            });
          }
        })
        .catch((e) => {
          const stopTime = process.hrtime(startTime);
          message.channel.send({
            embed: {
              title: `Eval Failed || Evaled in ${
                stopTime[0] > 0 ? `${stopTime[0]}s` : ""
              }${stopTime[1] / 1000000}ms`,

              fields: [
                {
                  name: "📥 Input:",
                  value: `\`\`\`js\n${code}\`\`\``,
                },
                {
                  name: "📤 Output:",
                  value: `\`\`\`js\n${e}\`\`\``,
                },
              ],
            },
          });
        });
    }
  }
};
