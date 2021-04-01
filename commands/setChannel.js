const channels = require('../channels')
const { fetchChannels, validCommands, setChannel, getChannels } = require('../channels')
module.exports = {
    commands: 'setChannel',
    minArgs: 2,
    expectedArgs: "<command> <channelId>",
    permissios: "ADMINISTRATOR",
    callback: async (message, args, text, client) => {
        const guildId = message.guild.id;
        const { channel } = message;

        if (!validCommands.includes(args[0])){
            channel.send(`${args[0]} is not a valid command`)
            return 
        }

        let result = await getChannels(guildId, args[0])


        let givenChannelId = (/<#(.*?)>/.exec(args[1]))[1]
        console.log("--------> Given Channel ID: ", givenChannelId);
        if (result !== null){
            if (result.channels.includes(`${givenChannelId}`)){
                channel.send("That channel has already been added!")
                return 
            }
        }


        result = await setChannel(guildId, args[0], givenChannelId)

        console.log('Result after setting setChannels =======> ', result)

        if (result.channels.length > 0){     
            channel.send(`The set channel for ${args[0]} is <#${result.channels[result.channels.length - 1]}>`).then(() => {
                fetchChannels(guildId, args[0]);
            })
            .catch(err => console.error(err))
        } else {
            channel.send(`There are no channels set for that command or something went wrong`)
        }
    }
}