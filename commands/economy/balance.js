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
        
        const coffeebeans = await economy.getCoffeebeans(guildId,userId);
        if (!args[0]){
            message.reply(`You have ${coffeebeans} <:coffeebeans:820214111887556638>`)
        }else {
            message.reply(`That user has ${coffeebeans} <:coffeebeans:820214111887556638>`)
        }
    }
}