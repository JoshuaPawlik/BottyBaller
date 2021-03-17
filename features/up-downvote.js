const config = require('../config.json');
let channels = config.upDownvoteChannels;

module.exports = (client) => {
    client.on('message', message => {
        const { channel } = message;
    if(!channels.includes(channel.id) || message.author.bot){
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