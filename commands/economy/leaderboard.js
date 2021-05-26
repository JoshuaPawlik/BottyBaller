const economy = require('../../economy')
// const Discord = require('discord.js');
// const Canvas = require('canvas');

//Function for canvas

// const applyText = (canvas, text) => {
// 	const context = canvas.getContext('2d');
// 	let fontSize = 70;

// 	do {
// 		context.font = `${fontSize -= 10}px sans-serif`;
// 	} while (context.measureText(text).width > canvas.width - 300);

// 	return context.font;
// };


module.exports = {
    commands: ['leaderboard', 'lb'],
    maxArgs: 1,
    expectedArgs: "",
    callback: async (message, args) => {
        
        const list = await economy.getCoffeebeansFromGL();

        let channel = message.channel;
        let string = ``;
        const guild = message.guild

        for (var i = 0; (i < 10 && i < list.length) ; i++){
            let userId = list[i].userId
            let pass1;
            let nickname = await guild.members.fetch(userId).catch(() => {
                console.log("Could not find member");
                pass1 = false;
            })
            if (pass1 === false) continue;
            let coffeebeans = await economy.getCoffeebeans(userId)
            console.log("Nickname ===> ", nickname, "\n coffeebeans ====> ", coffeebeans);
            string += `**${i+1}.** ${nickname}: ${coffeebeans} <:coffeebeans:820214111887556638>\n\n`;
        }

        const Embed = {
            color: "#8d7070",
            title: `Coffeebeans leaderboard <:coffeebeans:820214111887556638>`,
            description: `${string}`,
            thumbnail: {
                url: (guild.iconURL() !== null)? `${guild.iconURL()}`: null,
            },
            timestamp: new Date(),
        };

            channel.send({embed: Embed})

        //Canvas code to start drawing a custom leaderboard 

        // const canvas = Canvas.createCanvas(700, 408);
        // const context = canvas.getContext('2d');

        // const background = await Canvas.loadImage('./wallpaper.jpg');
        // context.drawImage(background, 0, 0, canvas.width, canvas.height);

        // context.strokeStyle = '#74037b';
        // context.strokeRect(0, 0, canvas.width, canvas.height);

        // context.font = '28px sans-serif';
        // context.fillStyle = '#ffffff';
        // context.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

        // context.font = applyText(canvas, `${member.displayName}!`);
        // context.fillStyle = '#ffffff';
        // context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

        // context.beginPath();
        // context.arc(125, 125, 100, 0, Math.PI * 2, true);
        // context.closePath();
        // context.clip();

        // const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
        // context.drawImage(avatar, 25, 25, 200, 200);

        // const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

        // channel.send(attachment);


    }
}