const channels = require('../channels')
const economy = require('../economy')


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

  await getApp(guildId).commands.post({
    data: {
        name: "Change-Nickname",
        description: "Change a user's nickname for 30 coffeebeans",
        options: [{
            type: 3,
            name: "member",
            description: "@ the member",
            required: true

        },
        {
          type: 3,
          name: "newNickname",
          description: "What are we going to call them? ",
          required: true
        }
      ]
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

      //------------------------------------------Ping Command---------------------------------------------
      if (command === 'ping'){
  
        reply(interaction, 'pong')
        console.log("INTERACTION ==============>",interaction)
  
      }
      //------------------------------------------Confess command------------------------------------------
       else if (command === 'confess'){

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

    //------------------------------------------Change nickname command------------------------------------------
    else if (command === 'change-nickname'){
      const userId = interaction.member.user.id
      console.log("Interaction=============>", interaction)

      let userBeans = await economy.getCoffeebeans(userId)

      if (userBeans < 30){
        reply(interaction, `You dont have enough coffeebeans for this! You need at least 30 <:coffeebeans:820214111887556638>!`)
        return 
      }
      else {
        const guildId = interaction.guild_id
        const guild = await client.guilds.cache.get(guildId)
        let givenUserId = (/<@!(.*?)>/.exec(args.member))
        if (!givenUserId){
          reply(interaction, `You need to @ the user who's nickname you would like to change`)
        }else {
          givenUserId = (/<@!(.*?)>/.exec(args.member))[1]
        }
        console.log("GIVENUSERID===============>", args.member)
        const member = await guild.members.fetch(givenUserId)
        member.setNickname(args.newnickname)
        .then(() => {
          reply(interaction, `You have mentioned ${args.member} and changed their nickname to \`${args.newnickname}\``)
          economy.subtractCoffeebeans(userId, 30)
          return
        }).catch(err => {
            console.log(err.code)
            if (err.code === 50013){
              reply(interaction, `You can't change that person's nickname`)
            } else if (err.code === 50035){
              reply(interaction, `That nickname is too long`)
            }else {
              reply(interaction, `Looks like we encountered an unknown error, contact an admin with details on what went wrong`)
            }
          return 
        })
      } 
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