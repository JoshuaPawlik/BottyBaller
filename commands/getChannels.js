const channels = require('../channels')
module.exports = {
    commands: 'getChannels',
    permissios: "ADMINISTRATOR",
    minArgs: 1,
    callback: async (message, args, text, client) => {
        const guildId = message.guild.id;
        const result = await channels.getChannels(guildId, args[0])

        console.log('result =======> ', result)

        if (result.channels.length < 1){     
            message.channel.send(`There are no channels set for that command`)
            .catch(err => console.error(err))
        } else {
            let string = ""

            result.channels.forEach(element => {
                string += `<#${element}> `
            });

            message.channel.send(string);
        }
    }
}