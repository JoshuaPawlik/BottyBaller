const listSlashes = require("./list-slashes")
module.exports = {
    commands: ['deleteSlash'],
    expectedArgs: "<id of command>",
    minArgs: 1,
    permissions:"AMINISTRATOR",
    callback: async (message, args, text, client) => {
        
        const guildId = message.guild.id
        const getApp = (guildId) => {
        const app = client.api.applications(client.user.id)
        if (guildId){
            app.guilds(guildId)
        }
        return app;
        }


        await getApp(guildId).commands(`${args[0]}`).delete().then(() => {
            listSlashes.callback(message, args, text, client);
        })


        // const slashCommands = await getApp(guildId).commands.get();
        //  console.log('slashCommands ====> ', slashCommands);
    }
}