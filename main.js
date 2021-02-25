const Discord = require('discord.js');
require('dotenv').config();
// const Sequelize = require('sequelize');



//Channel variables
const bot_testing = '776494471813922836'
const thisOrThat = '787758467406495806';
const clips = '771437521875763251';
const memes = '749073713164714174';
const emoji_submissions = '776528360850587648';
const server_suggestions = '752405474288074804';
const polls = '808969588603224084';
const confessions = '813890360555208755';


const client = new Discord.Client();
module.exports = {client: client};

const prefix = 'caffeine';
const prefix2 ='Caffeine'

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Caffeine is online!');

    client.api.applications(client.user.id).guilds("652753932904562709").commands.post({
        data: {
            name: "confess",
            description: "Make a private confession",
            options: [{
                type: 3,
                name: "confession",
                description: "Something",
                required: true
    
            }]
        }
    });


});

client.on('message', message =>{

    const channelId = message.channel.id;
    
    if(message.author.bot) return;

    if(channelId === clips|| channelId === memes){

       if (message.content.includes('https:'||'http:') || message.attachments.size > 0) {
            // console.log("------------------------> Message \n", JSON.stringify(message.attachments));
            console.log("LINK DETECTED");
            message.react(":upvote:767990923875319809");
            message.react(":downvote:767990889917710337");
            return;
        } else {
            console.log("Nothing detected");
        }

    }
                                    //Emoji-submissions
    else if(channelId === emoji_submissions){

        if (message.attachments.size > 0){
            // console.log("------------------------> Message \n", JSON.stringify(message.attachments));
            message.react("a:AS_Upvote:774308897468710942");
            message.react("a:AS_Downvote:774309005967360092");

            return;
        } else {
            message.channel.send("You're only allowed to post images here!")
            .then(msg => {
                message.delete({timeout: 4000});
                msg.delete({timeout: 4000});
            })
        .catch(console.error);
        }
        return;
    }
    else if(channelId === confessions){
            message.channel.send("You're not allowed to send messages here, only use the `/confess` command")
            .then(msg => {
                message.delete({timeout: 4000});
                msg.delete({timeout: 4000});
            })
        .catch(console.error);
        return;
    }
    else if(channelId === server_suggestions /*|| channelId === bot_testing*/){
      if(((!message.content.startsWith(prefix) && !message.content.startsWith(prefix2)) || (!message.content.includes('suggest'))) && message.author.id !== message.guild.ownerID ){
        message.channel.send("Suggestions usage is: ```caffeine suggest [your suggestion]```")
        .then(msg => {
            message.delete().then(() =>{
                msg.delete({timeout: 15000});
            }).catch(console.error);
        })
        .catch(console.error);
      }  
    }
    else if(channelId === thisOrThat /*|| channelId === bot_testing*/){
        if(!message.content.includes('or') && message.author.id !== message.guild.ownerID ){
          message.channel.send("This or That usage is: ```<this> or <that>```")
          .then(msg => {
              message.delete().then(() =>{
                  msg.delete({timeout: 15000});
              }).catch(console.error);
          })
          .catch(console.error);
        } else {
            client.commands.get('tot').execute(message,client);
            return;
        }  
      }
    if(!message.content.startsWith(prefix) && !message.content.startsWith(prefix2)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    args.shift(); //Gets rid of space char in front of the command
    if (args.length === 0) return;
    const command = args.shift().toLowerCase();
    // console.log('args2 ----> ', args);

    if (command === 'tell'){
       client.commands.get('tell').execute(message, args,client);
    } else if (command == 'jojo'){
        client.commands.get('jojo').execute(message, args);
    } else if (command == 'poll'){
        if (channelId !== polls && channelId !== bot_testing ){
            message.channel.send(`Polls are made in <#${polls}>`)
            .then(msg => {
                message.delete().then(() =>{
                    msg.delete({timeout: 5000});
                }).catch(console.error);
            })
        } else {
            client.commands.get('poll').execute(message, args);
        }
    } else if (command == 'suggest'){   
        if (channelId !== '752405474288074804'){
            message.channel.send(`Suggestions are made in <#${server_suggestions}>`)
            .then(msg => {
                message.delete().then(() =>{
                    msg.delete({timeout: 5000});
                }).catch(console.error);
            })
        } else {
            client.commands.get('suggest').execute(message, args,client);
        }
    } else if ( command == 'timer'){
        client.commands.get('timer').execute(message, args);
    } else if ( command == 'coinflip'){
        client.commands.get('coinflip').execute(message, args);
    } else if (command == 'start'){
        client.commands.get('start').execute(message, args,client);
    } else if (command == 'invite'){
        client.commands.get('invite').execute(message, args,client);
    } 
})






//Keep this at the bottom of the file
client.login(process.env.BOT_TOKEN);





// module.exports = {
//     client: client
// }
// const sequelize = new Sequelize('database', 'user', 'password', {
// 	host: 'localhost',
// 	dialect: 'sqlite',
// 	logging: false,
// 	// SQLite only
// 	storage: 'database.sqlite',
// });


// const Tags = sequelize.define('tags', {
// 	name: {
// 		type: Sequelize.STRING,
// 		unique: true,
// 	},
// 	description: Sequelize.TEXT,
// 	username: Sequelize.STRING,
// 	usage_count: {
// 		type: Sequelize.INTEGER,
// 		defaultValue: 0,
// 		allowNull: false,
// 	},
// });