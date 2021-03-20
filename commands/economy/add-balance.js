const economy = require('../../economy')

module.exports = {
    commands: ['addbalance', 'addbal'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<The target's @> <coin amount>",
    permissions: 'ADMINISTRATOR',
    callback: async (message, arguments) => {
        const mention = message.mentions.users.first();

        if (!mention){
            message.reply('Please tag a user to add coffeebeans to')
            return
        }

        const coffeebeans = arguments[1]
        if (isNaN(coffeebeans)){
            message.reply('Please provide a valid number of coffeebeans.')
            return 
        }

        const guildId = message.guild.id
        const userId = mention.id

        const newcoffeebeans = await economy.addCoffeebeans(guildId, userId, coffeebeans);

        message.reply(`You have given <@${userId}> ${coffeebeans} coffeebeans. They now have ${newcoffeebeans} coffeebeans <:coffeebeans:821788925793271881>!`)

    }
}