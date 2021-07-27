const channels = require('../../channels')

module.exports = {
    commands: ['confess'],
    callback: async (args, interaction, reply, client) => {
        const {channel_id, guild_id} = interaction;

        const setChannel = await channels.getChannelOfCommand(channel_id, guild_id, 'confessions')
        
        if(!setChannel){
            console.log("CARRY ON SLASH FAILED", channel_id, guild_id )
            reply(interaction, 'You may not have a defined confessions channel, contact an Administrator');
            return
        }

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
  }