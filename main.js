require('dotenv').config();
const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const mongo = require('./mongo')
const path = require('path')
const fs = require('fs')
const { Mongoose } = require('mongoose')
const loadCommands = require('./commands/load-commands')
const loadFeatures = require('./features/load-features')
const loadSlashCommands = require('./slash-commands/load-slashCommands')
// const mongo = require('./util/mongo')
const channels = require('./channels')

const guildId = process.env.GUILD_ID;

client.on('ready', async () => {
  console.log('The client is ready!') 
  
  await mongo().then(() => {
    console.log("Connected to MongoDB");
  })
  
  loadCommands(client);
  loadFeatures(client);
  loadSlashCommands(client, guildId);
  channels.fetchChannels();

})//end client.on

client.login(process.env.BOT_TOKEN)
