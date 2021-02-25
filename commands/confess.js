const { MessageEmbed, messageReaction } = require("discord.js")
const {client} = require("../main.js");

const confessions = '813890360555208755';
const bot_testing = '776494471813922836';

client.on('ready', () => {
    // client.api.applications(client.user.id).guilds("652753932904562709").commands("813835330817884190").delete().catch(err => console.error(err));
    // client.api.applications(client.user.id).guilds("652753932904562709").commands.get({})
    // .then(data => {
        // console.log("DATA HERE +++++++++++++++>", data);
    // });

    client.ws.on('INTERACTION_CREATE', async interaction => {

        console.log("INTERACTION ====>", interaction);
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;


        if (command === 'confess'){ 
            console.log("ARGS =====> ", args);


            const Embed = {
                color: Math.floor(Math.random()*16777215).toString(16),
                title: `Anonymous Confession`,
                description: `"${args[0].value}"`,
                timestamp: new Date(),
                footer: {
                    text: 'Posted',
                    icon_url: '',
                },
            };

            client.channels.cache.get(`${confessions}`).send({embed: Embed}).catch(console.error);
        }
    });
});



//Reference 
//     .then( async messageReaction => {
//         try {
//             await messageReaction.react("😯");
//             await messageReaction.react("😳");
//             await messageReaction.react("🤔");
//             // await messageReaction.react("😜");
//             await messageReaction.react("🥵");
//             await messageReaction.react("😰");
//             await messageReaction.react("🤮");
//             await messageReaction.react("😡");

//         } catch (error){
//             console.error("One of the emojis failed to react on a confession");
//         }
    // here you could do anything. in this sample
    // i reply with an api interaction
// }).catch(console.error);
    // client.api.interactions(interaction.id, interaction.token).callback.post({
    //     data: {
    //         type: 4,
    //         data: {
    //             content: "hello world!!!"
    //         }
    //     }
    // })


// url = "https://discord.com/api/v8/applications/<my_application_id>/commands"

// json = {
//     "name": "blep",
//     "description": "Send a random adorable animal photo",
//     "options": [
//         {
//             "name": "animal",
//             "description": "The type of animal",
//             "type": 3,
//             "required": True,
//             "choices": [
//                 {
//                     "name": "Dog",
//                     "value": "animal_dog"
//                 },
//                 {
//                     "name": "Cat",
//                     "value": "animal_cat"
//                 },
//                 {
//                     "name": "Penguin",
//                     "value": "animal_penguin"
//                 }
//             ]
//         },
//         {
//             "name": "only_smol",
//             "description": "Whether to show only baby animals",
//             "type": 5,
//             "required": False
//         }
//     ]
// }

// // # For authorization, you can use either your bot token 
// headers = {
//     "Authorization": "Bot 123456"
// }

// // # or a client credentials token for your app with the applications.commmands.update scope
// headers = {
//     "Authorization": "Bearer abcdefg"
// }

// r = requests.post(url, headers=headers, json=json)