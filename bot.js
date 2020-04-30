const tmi = require('tmi.js');

var opts = {
    identity: {
      username: "",
      password: "oauth:"
    },
    channels: [
      ""
    ]
  };

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  const commandName = msg.trim();// Remove whitespace from chat message

  // If the command is known, let's execute it
  if (commandName.indexOf('!random ') === 0) {
    const getNbr = commandName.split(' ')[1];
    if (!isNaN(getNbr)){
      if (parseInt(getNbr) > 0) {
        const num = rollDice(parseInt(getNbr));
        client.say(target, 'Tu as tiré le ' + num + '.');
      }
    }
  }
}
// Function called when the "dice" command is issued
function rollDice(nbr) {
  const sides = nbr;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log('* Le bot est connecté à l\'adresse: ' + addr + ':' + port + '.');
}
