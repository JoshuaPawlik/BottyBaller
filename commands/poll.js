const { MessageEmbed, messageReaction } = require("discord.js");

module.exports = {
    name: 'poll',
    description: '',
    execute(message,args){
        const Embed = new MessageEmbed()
        .setColor(0xFFC300)
        .setTitle('Initiate Poll')
        .setDescription('caffeine poll to initiate a simple yes or no poll')

        if (!args[1]){
            message.channel.send(Embed);
            return;
        }

        let msgArgs = args.slice(0).join(" ");

        message.channel.send(msgArgs).then(messageReaction => {
            messageReaction.react("👍")
            messageReaction.react("👎")
            message.delete({timeout: 1000});
        }).catch(console.error);
        return;
    }
}