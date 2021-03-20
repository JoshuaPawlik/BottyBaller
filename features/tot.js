const config = require('../config.json');
let channels = config.totChannels

module.exports = (client) => {
    client.on('message', message => {
        const { channel } = message;



        if (!channels.includes(channel.id) || message.author.bot) {
            return
          }

        var splitted = message.content.split("or")
        var tis = splitted[0];
        var that = splitted[1];

        

        console.log("------------------->", message.author);
        console.log("------------------->", message.channel);

        if (!tis || !that){
            message.channel.send("This or That usage is: ```<this> or <that>```").then(msg => {
                message.delete({timeout: 15000}).then(() =>{
                    msg.delete({timeout: 1000});
                }).catch(console.error);
            })
            .catch(console.error);

            return;
        }
        const Embed = {
            // color: 0x0099ff,
            title: `${message.author.username} asks:`,
            // url: 'https://discord.js.org',
            // author: {
            //     name: 'Some name',
            //     icon_url: 'https://i.imgur.com/wSTFkRM.png',
            //     url: 'https://discord.js.org',
            // },
            description: `${tis} **or** ${that}`,
            thumbnail: {
                // url: 'https://i.imgur.com/wSTFkRM.png',
                url: message.author.avatarURL()
            },
            // fields: [
            //     {
            //         name: 'Regular field title',
            //         value: 'Some value here',
            //     },
            //     {
            //         name: '\u200b',
            //         value: '\u200b',
            //         inline: false,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            //     {
            //         name: 'Inline field title',
            //         value: 'Some value here',
            //         inline: true,
            //     },
            // ],
            // image: {
            //     url: 'https://i.imgur.com/wSTFkRM.png',
            // },
            timestamp: new Date(),
            footer: {
                text: 'Asked',
                icon_url: '',
            },
        };
        
        // message.channel.send({ embed: exampleEmbed });
        
        
        // const Embed = new MessageEmbed()
        // .setTitle(`Suggestion from ${message.author.username}`+ "#"+ `${message.author.discriminator}`)
        // .setDescription(`${msgArgs}`)
        // .setAuthor(null,message.author.avatarURL())

        client.channels.cache.get(message.channel.id).send({embed: Embed})
            .then(messageReaction => {
            messageReaction.react("1️⃣")
            messageReaction.react("2️⃣")
            message.delete({timeout: 1000});

        }).catch(console.error);
        return;

    })
}