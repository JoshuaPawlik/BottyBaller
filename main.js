const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const mongo = require('./mongo')
const path = require('path')
const fs = require('fs')
const { Mongoose } = require('mongoose')
const messageCounter = require('./message-counter')
// const mongo = require('./util/mongo')

client.on('ready', async () => {
  console.log('The client is ready!') 

  await mongo().then(() => {
    console.log("Connected to MongoDB");
  })


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

  messageCounter(client)
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