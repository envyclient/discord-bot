const discord = require("discord.js");
const fetch = require('node-fetch');
require('dotenv').config();

const client = new discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    if (member.guild.id !== process.env.GUILD) {
        return;
    }

    fetch(process.env.ENDPOINT, {
        method: 'POST',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ discord_id: member.id })
    }).then(response => {
        console.log(response);
    });
});

client.login(process.env.TOKEN);