const channels = require('../channels')

let storedDrugs = {
    "m" : 200,
    "x": 200
}

const getAuthorDisplayName = async (msg) => {
    const member = await msg.guild.member(msg.author);
    return member ? `**${member.nickname}**` : `**${msg.author.username}**`;
  }

module.exports = (client) => {
    client.on('message', async (message) => {

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + " CDT";
        let nickname = await getAuthorDisplayName(message);
        
        let carryOn = await channels.carryOn(message, 'drug-logs')
        if(!carryOn){
            return
        }
        else if (message.content.match(/^[a-zA-Z]{1,10} [0-9]{0,4} [a-zA-Z]{1,10}/)){
            let args = message.content.split(" ")
            args[1] = Number(args[1])

            if (((args[0].toLowerCase() === 'set' || args[0].toLowerCase() === 'Set') && message.member.roles.cache.some(role => role.name === 'Officer'))){
                if (args[2] === 'm'){
                    storedDrugs['m'] = args[1];
                    message.channel.send(`${nickname} set the mushroom storage to ${args[1]}.🍄📦 (${time})`).then(() => {message.delete();})
                    message.channel.send(`---------------------------------------------------`)
                } else if (args[2] === 'x'){
                    message.channel.send(`${nickname} set the ecstasy storage to ${args[1]}.💊📦 (${time})`).then(() => {message.delete();})
                    message.channel.send(`---------------------------------------------------`)
                }

            }
            else if ((args[0].toLowerCase() === 't' || args[0].toLowerCase() === 'take')){
                if (args[2] === 'm'){
                    storedDrugs['m'] = storedDrugs['m'] - args[1];
                    message.channel.send(`${nickname} took ${args[1]} mushrooms (${time})`).then(() => {message.delete();})
                    message.channel.send(`This leaves ${storedDrugs['m']}🍄 left in storage.`)
                    message.channel.send(`---------------------------------------------------`)
                } else if (args[2] === 'x'){
                    storedDrugs['x'] = storedDrugs['x'] - args[1];
                    message.channel.send(`${nickname} took ${args[1]} ecstasy (${time})`).then(() => {message.delete();})
                    message.channel.send(`This leaves ${storedDrugs['x']}💊 left in storage.`)
                    message.channel.send(`---------------------------------------------------`)
                }

            } else if ((args[0].toLowerCase() === 'p' || args[0].toLowerCase() === 'put')){
                if (args[2] === 'm'){
                    storedDrugs['m'] = storedDrugs['m'] + args[1];
                    message.channel.send(`${nickname} put ${args[1]} mushrooms (${time})`).then(() => {message.delete();})
                    message.channel.send(`This leaves ${storedDrugs['m']}🍄 left in storage.`)
                    message.channel.send(`---------------------------------------------------`)
                } else if (args[2] === 'x'){
                    storedDrugs['x'] = storedDrugs['x'] + args[1];
                    message.channel.send(`${nickname} put ${args[1]} ecstasy (${time})`).then(() => {message.delete();})
                    message.channel.send(`This leaves ${storedDrugs['x']}💊 left in storage.`)
                    message.channel.send(`---------------------------------------------------`)
                }

            } else {
                message.channel.send("Looks like you fucked up somewhere, try again. It should look something like: \n `t 20 m` or `p 100 x`").then(msg => {
                    message.delete();
                    msg.delete({timeout: 10000});
            }).catch(console.error);

            }
        } else {
            message.channel.send("Your message does not match the required input. Dumbass. It should look something like: \n `t 20 m` or `p 100 x`").then(msg => {
                    message.delete();
                    msg.delete({timeout: 10000});
            }).catch(console.error);
        }
    })
    return
}

