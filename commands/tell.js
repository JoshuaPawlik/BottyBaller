const { MessageEmbed } = require("discord.js");


module.exports = {
    name: 'tell',
    description: "This will make Caffeine say something for you",
    execute(message, args,client){
        let msgArgs = args.slice(0).join(" ");

        const Embed = new MessageEmbed()
        .setColor(0xFFC300)
        .setTitle('Hey Everyone!')
        .setDescription(`${msgArgs}`)

        client.channels.cache.get('652753932904562712').send(Embed);


    }
}