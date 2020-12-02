const { MessageEmbed } = require("discord.js");


function sendMessage(message){
    message.channel.send(`Hey <@${message.author.id}> your timer has finished!`).catch(console.error);
    return;
}


module.exports = {
    name: 'timer',
    description: "This will make Caffeine ping you after a certain amount of time",
    execute(message, args,client){
        // let msgArgs = args.slice(0).join(" ");


        console.log("Message args ------------>", args);

        // const Embed = new MessageEmbed()
        // .setColor(0xFFC300)
        // .setTitle('Hey Everyone!')
        // .setDescription(`${msgArgs}`)

        // client.channels.cache.get('652753932904562712').send(Embed);

        var amount;

        //check to see we were passed an argument
        if (args.length > 0){

            //set args equal to first thing after the command
            amount = args[0];
            console.log('amount ---->', amount);
            
            //split the string at numbers
            var split_Numbers_String = amount.split(/(\d+)/)
            split_Numbers_String.shift();

            console.log("Split string ++++", split_Numbers_String);

            //check to see it was a number
            var timeArg = Number(split_Numbers_String[0]);
            if (isNaN(timeArg)){
                console.log("THAT WASNT A NUMBER");
                return;
            }


        } else {
            console.log('args is too short');
            return;
        }
        
        var timeSeconds = timeArg * 1000;

        var totalTime = timeSeconds;

        var secondArg = split_Numbers_String[1];
        if (secondArg == ''){
            secondArg = split_Numbers_String[2];
        }
        
        if (secondArg == 'm' || secondArg == 'min' || secondArg == 'minutes' || secondArg == 'minute'){
            totalTime = totalTime * 60;
            message.channel.send(`Timer has been set for ${timeArg} minute(s)!`);
        } else if (secondArg == 'h' || secondArg == 'hour' || secondArg == 'hours'){
            message.channel.send(`Timer has been set for ${timeArg} hour(s)!`);
            totalTime = totalTime * 60 * 60;
        } else {
            message.channel.send(`Timer has been set for ${timeArg} second(s)!`);
        }



        setTimeout(sendMessage, totalTime, message );


        return;

    }
}