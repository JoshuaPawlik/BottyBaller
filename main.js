require('dotenv').config();
const Discord = require('discord.js')
const client = new Discord.Client()
const path = require('path')
const fs = require('fs')
const { Mongoose } = require('mongoose')

//Required Files
const economy = require('./economy')
const mongo = require('./mongo')
const redis = require("./redis.js");
const loadCommands = require('./commands/load-commands')
const loadFeatures = require('./features/load-features')
const loadSlashCommands = require('./slash-commands/load-slashCommands')
const channels = require('./channels')

const guildId = process.env.GUILD_ID;

client.on('ready', async () => {
  console.log('The client is ready!') 
  
  await mongo().then(() => {
    console.log("Connected to MongoDB");
  })

  await redis().then(() => {
    console.log("Redis client created")
  })

  redis.expire(message => {
    if (message.startsWith('daily-')){
        const split = message.split('-');
        economy.setClaimedDaily(split[1], false);
    }
})
  
  loadCommands(client);
  loadFeatures(client);
  loadSlashCommands(client, guildId);
  channels.fetchChannels();

})//end client.on

client.login(process.env.BOT_TOKEN)
