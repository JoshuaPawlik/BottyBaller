const channels = require('../channels')

module.exports = (client) => {
    client.on('message', async (message) => {
        let carryOn = await channels.carryOn(message, 'deathnote')
        if(!carryOn){
            return
        }

        // const author = message.author.id
        let mentionMember = message.mentions.members.first();    
        if (!mentionMember){
            message.channel.send("You need to @ the user").then((msg) => {
                msg.delete({timeout:5000})
                message.delete({timeout: 5000})
            });
            return
        }

        mentionMember.kick()
            .then(() => {
               message.author.send(`You've written ${mentionMember.displayName}'s name in the deathnote.`).catch(console.error);
            })
            .catch(console.error);

    })
}