const channels = require('../../channels')
const { fetchChannels } = require('../../channels')
module.exports = {
    commands: 'removeChannel',
    minArgs: 1,
    expectedArgs: "<channelId>",
    permissions: "ADMINISTRATOR",
    callback: async (message, args, text, client) => {
        const guildId = message.guild.id;
        const { channel } = message;
        // let result = await channels.getChannels(guildId, args[0])


        let givenChannelId = (/<#(.*?)>/.exec(args[0]))
        if (givenChannelId){
            givenChannelId = givenChannelId[1]
        } else {
            message.channel.send("You need to use # when you mention the channel");
            return
        }
        // console.log("--------> Given Channel ID: ", givenChannelId);
        // if (result !== null){
        //     if (result.channels.includes(`${givenChannelId}`)){
        //         channel.send("That channel has already been added!")
        //         return 
        //     }
        // }


        let result = await channels.removeChannel(guildId, args[0], givenChannelId)

        console.log('Result after setting deleteChannels =======> ', result)
        
        fetchChannels();
        // if (result.channels.length > 0){     
        //     channel.send(`The set channel is <#${result.channels[result.channels.length - 1]}>`).then(() => {
        //     })
        //     .catch(err => console.error(err))
        // } else {
        //     channel.send(`There are no channels set for that command or something went wrong`)
        // }
    }
}