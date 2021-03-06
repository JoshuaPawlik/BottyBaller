const economy = require('../../economy')

module.exports = {
    commands: ['addbalance', 'addbal'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<# of beans> <The target's @>",
    permissions: 'ADMINISTRATOR',
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first();

        if (!mention){
            message.reply('Please tag a user to add coffeebeans to')
            return
        }

        const coffeebeans = arguments[0]
        if (isNaN(coffeebeans)){
            message.reply('Please provide a valid number of coffeebeans.')
            return 
        }

        // const guildId = message.guild.id
        const userId = mention.id

        const newcoffeebeans = await economy.addCoffeebeans(userId, coffeebeans);

        message.reply(`You have given <@${userId}> ${coffeebeans} coffeebeans. They now have ${newcoffeebeans}<:coffeebeans:820214111887556638>!`)

    }
}