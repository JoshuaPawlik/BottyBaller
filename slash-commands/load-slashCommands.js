// const config = require('../config.json')
const channels = require('../channels')


module.exports = async (client, guildId) => {
  
  const getApp = (guildId) => {
      const app = client.api.applications(client.user.id)
      if (guildId){
        app.guilds(guildId)
      }
      return app;
    }

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
        console.log("INTERACTION ==============>",interaction)
  
      } else if (command === 'confess'){

      const {channel_id, guild_id} = interaction;

      const setChannel = await channels.getChannelOfCommand(channel_id, guild_id, 'confessions')
      
      if(!setChannel){
        // console.log("CARRY ON SLASH FAILED", channel_id, guildId )
        reply(interaction, 'You may not have a defined confessions channel, contact an Administrator');
        return
      }

      // console.log("CHANNELS CACHE =====>", channels.channelsCache)
      console.log("Confessions channel =====>", setChannel)
  
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
      client.channels.cache.get(`${setChannel}`).send({embed: Embed})
      .then(() => {
        reply(interaction, `Your confesssion has been anonomously submitted to <#${setChannel}>!`)
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
}