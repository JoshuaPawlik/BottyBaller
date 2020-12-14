const { MessageEmbed, messageReaction } = require("discord.js")

module.exports = {
    name: 'tot',
    description: '',
    execute(message, client){

        // if (!args[1]){
        //     const Embed = new MessageEmbed()
        //     .setTitle('Make a Suggestion')
        //     .setDescription('A suggestion for the Caffeine server')
        //     client.channels.cache.get('752405474288074804').send({embed: Embed});
        //     return;
        // }
        // let msgArgs = args.slice(0).join(" ");
        // var splitted = msgArgs.split("or");
        var splitted = message.content.split("or")
        var tis = splitted[0];
        var that = splitted[1];

        

        console.log("------------------->", message.author);
        console.log("------------------->", message);

        if (!tis || !that){
            message.channel.send("This or That usage is: ```<this> or <that>```").then(msg => {
                message.delete().then(() =>{
                    msg.delete({timeout: 15000});
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

        client.channels.cache.get('787758467406495806').send({embed: Embed})
            .then(messageReaction => {
            messageReaction.react("1️⃣")
            messageReaction.react("2️⃣")
            message.delete({timeout: 1000});

        }).catch(console.error);
        return;
    }
}