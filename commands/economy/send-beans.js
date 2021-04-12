const economy = require('../../economy')

module.exports = {
    commands: ['send', 'give'],
    minArgs: 2,
    maxArgs: 2,
    expectedArgs: "<# of beans> <The target's @>",
    callback: async (message, arguments) => {
        const senderId = message.author.id
        const receiverId = message.mentions.users.first().id

        if (!receiverId){
            message.reply('Please tag a user to send coffeebeans to')
            return
        }

        const coffeebeans = arguments[0]
        if (isNaN(coffeebeans)){
            message.reply('Please provide a valid number of coffeebeans.')
            return 
        }

        console.log("SENDER ID ===> ", senderId)
        console.log("RECIEVER ID ===> ", receiverId)
        let userBeans = await economy.getCoffeebeans(senderId)

      if (userBeans < coffeebeans){
        message.reply(`You dont have enough coffeebeans for this!`);
        return 
      }

        await economy.addCoffeebeans(receiverId, coffeebeans).then(() => {
            economy.subtractCoffeebeans(senderId, coffeebeans).then(() => {
                message.channel.send(`You have sent <@${receiverId}> ${coffeebeans} <:coffeebeans:820214111887556638>.`)
            })
        })


    }
}