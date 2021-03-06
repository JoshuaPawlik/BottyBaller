module.exports = {
    commands: ['giveall'],
    expectedArgs: '<role-id>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    permissions: 'ADMINISTRATOR',
    callback: async (message, args, text, client) => {
        // find the role with the name "Community"
        // let role = message.guild.roles.find(r => r.name == 'Community')
        const role = await message.guild.roles.cache.get(`${args[0]}`);

        // if role doesn't exist, notify the author of command that the role couldn't be found
        if (!role) return message.channel.send(`**${message.author.username}**, role not found`)
        // message.channel.send()
        // console.log("Role ===========>", role)
        // find all guild members that aren't bots, and add the "Community" role to each
        await message.guild.members.fetch().then((members) => {
            members.filter((m) => (m.user.bot === false)).forEach(async (member) => {
                console.log(member.user.username)
                await member.roles.add(role);
            })
        })

        // notify the author of the command that the role was successfully added to all members
        message.channel.send(`**${message.author.username}**, role **${role.name}** was added to all members`)
    }
  }