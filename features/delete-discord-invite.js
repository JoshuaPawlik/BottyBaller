const channels = require('../channels');

module.exports = (client) => {
    client.on('message', async (message) => {
        if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) {

            // console.log("MESSAGE IN FIRST PART====================>", message.author);

            if (!message.member.roles.cache.find(role => role.name === 'Barista')) {
                const setChannel = await channels.getChannelOfCommand(null, message.guild.id, 'mod-logs')

                // await message.author.send('Invite links are not allowed in Caffeine. Message a Barista for permission to post an invite to another Discord server. Go Spam this one in other servers instead \n https://discord.gg/a9kG7CepuR').catch(err => {
                //     console.log("Can't send messages to this user here is the error =====>", err);
                // })

                const Embed = {
                    color: Math.floor(Math.random()*16777215).toString(16),
                    title: `${message.author.username}`+ "#"+ `${message.author.discriminator} sent:`,
                    description: `${message.content}`,
                    timestamp: new Date(),
                    footer: {
                        text: 'Posted',
                        icon_url: '',
                    },
                };
                
                message.delete().then((message) => {
                    client.channels.cache.get(`${setChannel}`).send({embed: Embed}).then(() => {
                        message.channel.send(`You trying to get banned for posting invite links ${message.member}?`).then((message) => {
                            message.channel.send("https://tenor.com/view/enen-no-shouboutai-fire-force-anime-lightsaber-arhur-boyle-gif-14677199")
                        })
                    })
                })
            }
        }
    })
}