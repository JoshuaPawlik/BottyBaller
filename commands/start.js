const { MessageEmbed } = require("discord.js");


module.exports = {
    commands: 'start',
    description: "This will make Caffeine say something for you",
    execute(message, args,client){
        let msgArgs = args.slice(0).join(" ");

        // const Embed = new MessageEmbed()
        // .setColor(0xFFC300)
        // .setTitle('Hey Everyone!')
        // .setDescription(`${msgArgs}`)

        function prayer(verse){
            if (verse === 1){
                // message.channel.send("https://tenor.com/view/anime-praying-latom-fire-force-iris-gif-15075412")
                message.channel.send("The flame is the soul's breath");
            } else if (verse === 2){
                message.channel.send("The black smoke is the soul's release");
            } else if (verse === 3){
                message.channel.send("Ashes thou went and art");
            } else if (verse === 4){
                message.channel.send("May thy soul");
            } else if (verse === 5){
                message.channel.send("Return to the great flame of fire");
                // message.channel.send("<a:Fire:734068247976083517>")
            } else if (verse === 6){
                message.channel.send("***Látom***");
            } else {
                message.channel.send("<:alfred_latom:782013481565421598>");
            }
            return;
        }

        // message.channel.send("The flame is the soul's breath");
        setTimeout(prayer,2000,1);
        setTimeout(prayer,4000,2);
        setTimeout(prayer,6200,3);
        setTimeout(prayer,8200,4);
        setTimeout(prayer,10200,5);
        setTimeout(prayer,12000,6);
        setTimeout(prayer,13000);

    }
}