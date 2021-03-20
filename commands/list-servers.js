module.exports = {
    commands: 'listServers',
    permissions: 'ADMINISTRATOR',
    callback: (message, args, text, client) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`
            )
        })
    }
}