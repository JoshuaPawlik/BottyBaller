const economy = require('../../economy')

module.exports = {
    commands: ['balance', 'bal'],
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    permissions: 'ADMINISTRATOR',
    callback: async (message) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id;

        console.log("ID", targetId);
        const guildId = message.guild.id;
        const userId = target.id;

        const coins = await economy.getCoins(guildId,userId);
        message.reply(`That user has ${coins} coins!`)
    }
}