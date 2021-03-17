const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
const mongo = require('./mongo')
const path = require('path')
const fs = require('fs')
const { Mongoose } = require('mongoose')
const loadCommands = require('./commands/load-commands')
const loadFeatures = require('./features/load-features')
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

  loadCommands(client);
  loadFeatures(client);
//------------------Slash commands ----------------------------
  await getApp(guildId).commands.post({
    data: {
      name: 'ping',
      description: 'A simple ping pong command'
    }
  })


  await getApp(guildId).commands.post({
    data: {
        name: "confess",
        description: "Make a private confession",
        options: [{
            type: 3,
            name: "confession",
            description: "Something",
            required: true

        }]
    }
});


const slashCommands = await getApp(guildId).commands.get();
  console.log('slashCommands ====> ', slashCommands);

  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const { name, options } = interaction.data
    const command = name.toLowerCase();

    const args = {};

    if (options) {
      for (const option of options){
        const {name,value} = option
        args[name] = value
      }
    }

    console.log(args)

    if (command === 'ping'){

      reply(interaction, 'pong')
      console.log("done")

   } else if (command === 'confess'){

    const Embed = {
        color: Math.floor(Math.random()*16777215).toString(16),
        title: `Anonymous Confession`,
        description: `"${args.confession}"`,
        timestamp: new Date(),
        footer: {
            text: 'Posted',
            icon_url: '',
        },
    };
    client.channels.cache.get(`${interaction.channel_id}`).send({embed: Embed})
    .then(() => {
      reply(interaction, 'You confesssion has been anomously submitted!');
    })
    .catch(console.error);
  }
})

  const reply = (interaction, response) => {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data:{
          type: 3,
          data: {
            content: response,
            flags: 64
          }
        } 
      })
  }
  //------------------Slash commands ----------------------------


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