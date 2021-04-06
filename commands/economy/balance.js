const economy = require('../../economy')

module.exports = {
    commands: ['balance', 'bal'],
    maxArgs: 1,
    expectedArgs: "[Target user's @]",
    callback: async (message, args) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id;
        
        console.log("ID", targetId);
        const guildId = message.guild.id;
        const userId = target.id;
        
        const coffeebeans = await economy.getCoffeebeans(guildId,userId);



        const Embed = {
            color: "#8d7070",
            title: `${target.username}\'s balance:`,
            // url: 'https://discord.js.org',
            // author: {
            //     name: 'Some name',
            //     icon_url: 'https://i.imgur.com/wSTFkRM.png',
            //     url: 'https://discord.js.org',
            // },
            description: `${coffeebeans} <:coffeebeans:820214111887556638>`,
            // thumbnail: {
                // url: 'https://i.imgur.com/wSTFkRM.png',
                // url: message.author.avatarURL()
            // },
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
            // timestamp: new Date(),
            // footer: {
            //     text: 'Asked',
            //     icon_url: '',
            // },
        };
        // if (!args[0]){
            message.channel.send({embed: Embed})
        // }
    }
}