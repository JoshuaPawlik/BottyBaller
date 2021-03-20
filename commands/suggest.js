module.exports = {
    commands: 'suggest',
    expectedArgs: '<suggestion>',
    minArgs: 1,
    callback: (message, args) => {
        let msgArgs = args.slice(0).join(" ");

        console.log("------------------->", message.author);
        console.log("------------------->", message);


        const Embed = {
            title: `Suggestion from ${message.author.username}`+ "#"+ `${message.author.discriminator}`,
            description: `${msgArgs}`,
            thumbnail: {
                url: message.author.avatarURL()
            },
            timestamp: new Date(),
            footer: {
                text: 'Posted',
                icon_url: '',
            },
        };

            // client.channels.cache.get('777692879727755291')
            message.channel.send({embed: Embed}).
            then(sentEmbed => {
                sentEmbed.react("a:AS_Upvote:774308897468710942")
                .then(() => {
                    sentEmbed.react("a:AS_Downvote:774309005967360092")
                })
                .catch(err => {
                    console.error(err)
                    sentEmbed.react('👍').then(() => {
                        sentEmbed.react('👎')
                    })
                }
                    
                )
                message.delete({timeout: 1000})
            })
        return;
    } 
}