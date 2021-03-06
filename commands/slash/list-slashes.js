module.exports = {
    commands: ['listSlashes'],
    permissions: "ADMINISTRATOR",
    callback: async (message, args, text, client) => {

        const guildId = message.guild.id
        const getApp = (guildId) => {
        const app = client.api.applications(client.user.id)
        if (guildId){
            app.guilds(guildId)
        }
        return app;
        }


        const slashCommands = await getApp(guildId).commands.get();
        //  console.log('slashCommands ====> ', slashCommands);

        let numSlashes = 0;
         for (const command of slashCommands){
             message.channel.send(`Command name: ${command.name}, id: ${command.id}`);
             numSlashes++;
         }
         message.channel.send(`Total number of slash commands was: ${numSlashes}`);
    }
}