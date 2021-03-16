const mongo = require('../mongo')
// const command = require('../command')
const welcomeSchema = require('../schemas/welcome-schema')
const cache = {} // guildId: [channelId, text]

module.exports = {
  commands: 'setWelcome',
  permissions: 'ADMINISTRATOR',
  callback: async (message, arguments, text) => {

    const { channel, guild } = message


    // cache[guild.id] = [channel.id, text]

    await welcomeSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
        text,
      },
      {
        upsert: true,
      }
    )

  }
}