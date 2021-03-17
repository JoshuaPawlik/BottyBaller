const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const mongo = require('./mongo')
const path = require('path')
const fs = require('fs')
const { Mongoose } = require('mongoose')
const tot = require('./features/tot')
const emojiSubmission = require('./features/emojiSubmission')
const upDownvote = require('./features/up-downvote')
// const mongo = require('./util/mongo')

const guildId = config.guildId;
const getApp = (guildId) => {
  const app = client.api.applications(client.user.id)
  if (guildId){
    app.guilds(guildId)
  }
  return app;
}
client.on('ready', async () => {
  console.log('The client is ready!') 

  await mongo().then(() => {
    console.log("Connected to MongoDB");
  })
//------------------Slash commands ----------------------------
  const slashCommands = await getApp(guildId).commands.get();
  console.log('slashCommands ====> ', slashCommands);

  await getApp(guildId).commands.post({
    data: {
      name: 'ping',
      description: 'A simple ping pong command'
    }
  })

  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const command = interaction.data.name.toLowerCase();

    if (command === 'ping'){
      reply(interaction, 'pong')
      console.log("done")
  }
})

  const reply = (interaction, response) => {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data:{
          type: 3,
          data: {
            content: response,
          }
        } 
      })
  }
  //------------------Slash commands ----------------------------


  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = dir => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files){
      const stat = fs.lstatSync(path.join(__dirname,dir,file))
      if (stat.isDirectory()){
        readCommands(path.join(dir,file))
      }else if (file !== baseFile) {
        const option = require(path.join(__dirname,dir,file))
        commandBase(client, option)
      }
    }
  }
  readCommands('commands')

  client.on('message', message => {

    if (!message.author.bot){
      tot(client, message);
      upDownvote(client, message);
      emojiSubmission(client,message);
    }

  })
  // command(client, ['cc', 'clearchannel'], (message) => {
  //   if (message.member.hasPermission('ADMINISTRATOR')) {
  //     message.channel.messages.fetch().then((results) => {
  //       message.channel.bulkDelete(results)
  //     })
  //   }
  // })

  // command(client, 'status', (message) => {
  //   const content = message.content.replace('caffeine status', '')
  //   // "!status hello world" -> "hello world"

  //   client.user.setPresence({
  //     activity: {
  //       name: content,
  //       type: 0,
  //     },
  //   })
  // })



})//end client.on

client.login(config.token)