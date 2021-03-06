const mongo = require('../mongo')
// const { prefix: globalPrefix,prefix2 } = require('../config.json')
// const guildPrefixes = {} // { 'guildId' : 'prefix' }

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

let deleteMessage = (msg,message) => {
  msg.delete({timeout: 5000})
  if (message){
    message.delete({timeout: 5000})
  }
}

let recentlyRan = [] // guildId-userId-command

module.exports = (client, commandOptions) => {
  let {
    commands,
    expectedArgs = '',
    permissionError = 'You do not have permission to run this command.',
    minArgs = 0,
    maxArgs = null,
    cooldown = -1,
    requiredChannel = '',
    permissions = [],
    requiredRoles = [],
    callback,
  } = commandOptions

  // Ensure the command and aliases are in an array
  if (typeof commands === 'string') {
    commands = [commands]
  }

  console.log(`Registering command "${commands[0]}"`)

  // Ensure the permissions are in an array and are all valid
  if (permissions.length) {
    if (typeof permissions === 'string') {
      permissions = [permissions]
    }

    validatePermissions(permissions)
  }

  client.ws.on('INTERACTION_CREATE', async (interaction) => {
    const { name, options } = interaction.data
    const content = name.toLowerCase();
    for (const alias of commands) {
      const command = `${alias.toLowerCase()}`
      // const command2 = `${prefix2}${alias.toLowerCase()}`

      if (content.toLowerCase().startsWith(`${command}`) || content.toLowerCase() === command){
        
        const args = {};

        if (options) {
          for (const option of options){
            const {name,value} = option
            args[name] = value
          }
        }

        console.log(args)

        callback(args, interaction, reply, client)
      }
    }
})

  const reply = (interaction, response) => {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data:{
          type: 4,
          data: {
            content: response,
            flags: 64
          }
        } 
      })
  }

  // Listen for messages
  client.on('message', async (message) => {
    const { member, content, guild, channel } = message

    // const prefix = guildPrefixes[guild.id] || globalPrefix
    const prefix = 'Botty '
    const prefix2 = 'botty '

    for (const alias of commands) {
      const command = `${prefix}${alias.toLowerCase()}`
      const command2 = `${prefix2}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${command} `) ||
        content.toLowerCase() === command || content.toLowerCase().startsWith(`${command2} `) ||
        content.toLowerCase() === command2
      ) {
        // A command has been ran

        // Ensure we are in the right channel
        if ((requiredChannel && requiredChannel !== channel.name) && message.author.id !== message.guild.owner.id) {
          //<#ID>
          const foundChannel = guild.channels.cache.find((channel) => {
            return channel.name === requiredChannel
          })

          message.reply(
            `You can only run this command inside of <#${foundChannel.id}>.`
          )
          return
        }

        // Ensure the user has the required permissions
        for (const permission of permissions) {
          if (!member.hasPermission(permission)) {
            message.reply(permissionError)
            return
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            )
            return
          }
        }

        // Ensure the user has not ran this command too frequently
        //guildId-userId-command
        let cooldownString = `${guild.id}-${member.id}-${commands[0]}`
        console.log('cooldownString:', cooldownString)

        if (cooldown > 0 && recentlyRan.includes(cooldownString)) {
          message.reply('You cannot use that command so soon, please wait.').then(msg => deleteMessage(msg, message))
          return
        }

        // Split on any number of spaces
        const arguments = content.split(/[ ]+/)

        // Remove the command which is the first index
        arguments.splice(0,2)

        // Ensure we have the correct number of arguments
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          )
          return
        }

        if (cooldown > 0) {
          recentlyRan.push(cooldownString)

          setTimeout(() => {
            console.log('Before:', recentlyRan)

            recentlyRan = recentlyRan.filter((string) => {
              return string !== cooldownString
            })

            console.log('After:', recentlyRan)
          }, 1000 * cooldown)
        }

        // Handle the custom command code
        callback(message, arguments, arguments.join(' '), client)

        return
      }
    }
  })
}

// module.exports.updateCache = (guildId, newPrefix) => {
//   guildPrefixes[guildId] = newPrefix
// }

// module.exports.loadPrefixes = async (client) => {
//   await mongo().then(async (mongoose) => {
//       for (const guild of client.guilds.cache) {
//         const guildId = guild[1].id

//         const result = await commandPrefixSchema.findOne({ _id: guildId })
//         guildPrefixes[guildId] = result ? result.prefix : globalPrefix
//       }

//       console.log(guildPrefixes)
//     }
//   })
// }
