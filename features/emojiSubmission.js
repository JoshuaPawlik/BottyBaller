const config = require('../config.json');
let channels = config.emojiSubmissionChannels

module.exports = (client) => {
    client.on('message', (message) => {
        if(!channels.includes(message.channel.id) || message.author.bot){
            return;
        }
        if (message.attachments.size > 0){
            // console.log("------------------------> Message \n", JSON.stringify(message.attachments));
            message.react("a:AS_Upvote:774308897468710942")
                 .then(() => {
                     message.react("a:AS_Downvote:774309005967360092");
                 })
                 .catch(err => {
                    console.error(err)
                    message.react('👍').then(() => {
                        message.react('👎')
                    })
                })
            return;
        } else {
            message.channel.send("You're only allowed to post images here!")
            .then(msg => {
                message.delete({timeout: 4000}).catch(err => (console.error(err)));
                msg.delete({timeout: 4000}).catch(err => (console.error(err)));
            })
            .catch(err => (console.error(err)));
        }
        return;
    })
}