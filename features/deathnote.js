const channels = require('../channels')

module.exports = (client) => {
    client.on('message', async (message) => {
        const guildId = message.guild.id;

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
                console.log(`${mentionMember.displayName} has been killed.`)
            })
            .catch(console.error);

    })
}