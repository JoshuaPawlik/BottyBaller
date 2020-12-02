const {client,  MessageMentions } = require("discord.js");

module.exports = {
    name: 'whisper',
    description: '',
    execute(client, message,args){
        message.delete();
        var user = args.shift().split('');
        user.shift();user.shift();user.shift();user.pop();
        user = user.join('');
        console.log('user ++++++++++', user);
        console.log('users', client.users.cache)
        user = client.users.cache.get(user)
        console.log('user',user);
        console.log('args',args);
        

        var letter = "";
        for (var i = 0; i < args.length; i++){
            letter += args[i];
            letter += " ";
        }
        user.send(letter + " - Anonymous\n\nThis is an anonymous message sent to you from another member of the Caffeine Discord server. To send anonymous messages say \"caffeine whisper @<user> <your message>\" in a DM to Caffeine ");
    }
}