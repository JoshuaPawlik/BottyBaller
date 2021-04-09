const economy = require('../../economy')

module.exports = {
    commands: ['balance', 'bal'],
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: async (message, args) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id;
        
        console.log("ID", targetId);
        const guildId = message.guild.id;
        const userId = target.id;
        
        const coffeebeans = await economy.getCoffeebeans(userId);



        const Embed = {
            color: "#8d7070",
            title: `${target.username}\'s balance:`,
            description: `${coffeebeans} <:coffeebeans:820214111887556638>`,
        };
        // if (!args[0]){
            message.channel.send({embed: Embed})
        // }
    }
}