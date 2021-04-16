const discord = require("discord.js");
const fetch = require('node-fetch');
require('dotenv').config();

const client = new discord.Client();

function sendRequest(id) {
    fetch(process.env.ENDPOINT, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ discord_id: id })
    }).then(response => {
        console.log(`Code: ${response.status}, User: ${id}`);
    });
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    
    // user joined non envy server
    if (member.guild.id !== process.env.GUILD) {
        return;
    }
    
    // sending the request to the server
    sendRequest(member.id);
});

client.on('message', message => {

    // message was sent in wrong channel 
    if (message.channel.id !== process.env.ADMIN_CHANNEl) {
        return;
    }

    // message does not start with right prefix
    if (!message.toString().startsWith('!esync')) {
        return;
    }

    // [ '!esync', 'user_id' ]
    const args = message.toString().split(' ');

    // command does not have enough arguments
    if (args.length <= 1) {
        return;
    }

    // discord id is invalid
    if (args[1].length !== 18) {
        return;
    }

    // sending the request to the server
    sendRequest(args[1]);

    // replying back to the command executor 
    message.channel.send('Request Sent.');
});

client.login(process.env.TOKEN);