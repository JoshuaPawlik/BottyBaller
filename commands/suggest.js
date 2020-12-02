const { MessageEmbed, messageReaction } = require("discord.js")

module.exports = {
    name: 'suggest',
    description: '',
    execute(message,args, client){

        if (!args[1]){
            const Embed = new MessageEmbed()
            .setTitle('Make a Suggestion')
            .setDescription('A suggestion for the Caffeine server')
            client.channels.cache.get('752405474288074804').send({embed: Embed});
            return;
        }
        let msgArgs = args.slice(0).join(" ");

        console.log("------------------->", message.author);
        console.log("------------------->", message);


        const Embed = {
            // color: 0x0099ff,
            title: `Suggestion from ${message.author.username}`+ "#"+ `${message.author.discriminator}`,
            // url: 'https://discord.js.org',
            // author: {
            //     name: 'Some name',
            //     icon_url: 'https://i.imgur.com/wSTFkRM.png',
            //     url: 'https://discord.js.org',
            // },
            description: `${msgArgs}`,
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
                text: 'Posted',
                icon_url: '',
            },
        };
        
        // message.channel.send({ embed: exampleEmbed });
        
        
        // const Embed = new MessageEmbed()
        // .setTitle(`Suggestion from ${message.author.username}`+ "#"+ `${message.author.discriminator}`)
        // .setDescription(`${msgArgs}`)
        // .setAuthor(null,message.author.avatarURL())

        client.channels.cache.get('752405474288074804').send({embed: Embed})
            .then(messageReaction => {
            messageReaction.react("a:AS_Upvote:774308897468710942")
            messageReaction.react("a:AS_Downvote:774309005967360092")
            message.delete({timeout: 1000});

        }).catch(console.error);
        return;
    }
}