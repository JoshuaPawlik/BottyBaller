const { MessageEmbed, messageReaction } = require("discord.js")

module.exports = {
    name: 'invite',
    description: '',
    execute(message,args){

        message.channel.send("https://discord.gg/a9kG7CepuR")
        // message.reply('https://discord.gg/a9kG7CepuR')
        .then(msg => {
            message.delete({timeout: 1000});
            msg.delete({timeout: 10000});
        })
        .catch(console.error);

        return;
    }
}