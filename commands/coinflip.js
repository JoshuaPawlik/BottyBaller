const { MessageEmbed, messageReaction } = require("discord.js")

module.exports = {
   commands:['coinflip', 'flip'],
    callback: (message,args, text) => {

        // if (!args[1]){
        //     const Embed = new MessageEmbed()
        //     .setTitle('Make a Suggestion')
        //     .setDescription('A suggestion for the Caffeine server')
        //     message.channel.send(Embed);
        //     return;
        // }
        // let msgArgs = args.slice(0).join(" ");

        // console.log("------------------->", message.author);
        
        // const Embed = new MessageEmbed()
        //     .setTitle(`Suggestion from ${message.author.username}`+ "#"+ `${message.author.discriminator}`)
        //     .setDescription(`${msgArgs} \n\n <@277918166267461642>`);

        // message.channel.send(Embed).then(messageReaction => {
        //     messageReaction.react("a:AS_Upvote:774308897468710942")
        //     messageReaction.react("a:AS_Downvote:774309005967360092")
        //     message.delete({timeout: 1000});

        // }).catch(console.error);


       function flip(num) {
        if (num === 1){
            message.channel.send("It's Heads!");
        } else {
            message.channel.send("It's Tails!");
        }
       }

        var num = Math.floor((Math.random() * 2) + 1)
        console.log("NUM ----->", num);

        message.channel.send("Flipping...");
        setTimeout(flip, 2000, num);


        return;
    }
}