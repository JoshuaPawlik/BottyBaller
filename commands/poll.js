module.exports = {
 commands: ['poll'],
 cooldown: 60,
 callback: (message, args) => {

        let msgArgs = args.slice(0).join(" ");
        var question = msgArgs.split("?")[0] + "?";
        var splitted = msgArgs.split("?").pop().toString().split(",");

        var nums = {
            0:"1️⃣",
            1:"2️⃣",
            2:"3️⃣",
            3:"4️⃣",
            4:"5️⃣"
        }


        if (splitted.length > 5){
            message.channel.send("Max 5 choices!\n\n Usage is: \`brew poll [question]? [choice1], [choice2], [choice3]\` \n\n Make sure to include the question mark and commas!").then(msg => {
                message.delete().then(() =>{
                    msg.delete({timeout: 15000});
                }).catch(console.error);
            }).catch(console.error);
            return;
        } else if (splitted.length < 2) {
            message.channel.send("You need at least 2 choices!\n\n Usage is: \`brew poll [question]? [choice1], [choice2], [choice3]\` \n\n Make sure to include the question mark and commas!").then(msg => {
                message.delete().then(() =>{
                    msg.delete({timeout: 15000});
                }).catch(console.error);
            }).catch(console.error);
            return;
        }

        console.log("------------------->", message.author);
        console.log("SPLITTED------------------->", splitted);
        let choices = ``;

        for ( var i = 0; i < splitted.length; i++){
            if (i == 0){
                choices += `${nums[i]}:${splitted[i]}`
            } else {
                choices += `\n \n${nums[i]}:${splitted[i]}`
            }
        }

        const Embed = {
            title: `${message.author.username} asks a poll:`,
            description: `**${question}**\n\n${choices}`,
            thumbnail: {
                url: message.author.avatarURL()
            },
            timestamp: new Date(),
            footer: {
                text: 'Asked',
                icon_url: '',
            },
        };

        message.channel.send({embed: Embed})
            .then(messageReaction => {
            for (i = 0; i < splitted.length; i++){
                messageReaction.react(`${nums[i]}`);
            }
            message.delete({timeout: 1000});

        }).catch(console.error);
        return;
    }   
}