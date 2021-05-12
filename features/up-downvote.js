const channels = require('../channels')

module.exports = (client) => {
    client.on('message', async message => {
    
        let carryOn = await channels.carryOn(message, 'upDown')
        if(!carryOn){
            return
        }

        else if (message.content.includes('https:'||'http:') || message.attachments.size > 0) {
                console.log("LINK DETECTED");
                message.react(":upvote:767990923875319809")
                .then(() => {
                    message.react(":downvote:767990889917710337");
                })
                .catch(err => {
                    console.error(err)
                    message.react('👍').then(() => {
                        message.react('👎')
                    })
                })
                return;
        } else {
            console.log("Nothing detected");
        }
    })
}