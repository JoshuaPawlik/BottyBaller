const mongo = require('./mongo')
const channelsSchema = require('./schemas/channels-schema')

let channelsCache = {};


const fetchChannels = async (guildId, command) => {
    let query = {}

  if (guildId) {
    query.guildId = guildId
    query.command = command
  }
  console.log("QUERY =====>", query)
  const results = await channelsSchema.find(query)

  for (const result of results) {
    //   console.log(result)
    if (!channelsCache[result.guildId]){
        channelsCache[result.guildId] = {}
    }
    // const { guildId, channelId } = result
    // channelsCache[guildId] = channelId
    const { command, channels } = result
    channelsCache[result.guildId][command] = channels
    console.log("Results in channels.js =====> ", channelsCache);
  }
}

module.exports = (client) => {
    fetchChannels()
}

module.exports.cacheIncludes = async (command, guildId, channelId) => {
    return (channelsCache[guildId][command].includes(channelId))
}

module.exports.getChannels = async (guildId, command) => {
        const result = await channelsSchema.findOne({
            guildId,
            command
        })
    
        // console.log('Result', result)
    
        let channels = [];

        if (result){
            channels = result.channels
        } else {
            console.log('Inserting a document')
            await new channelsSchema({
                guildId,
                command,
                channels: []
            }).save()
        }
    
        return result;
}

module.exports.setChannels = async (guildId, command, channelId) => {
    const result = await channelsSchema.findOneAndUpdate({
        guildId,
        command
    },{
        guildId,
        command,
        $push: {
            channels: channelId
        }
    },{
        upsert: true,
        new: true
    })

    return result;
}

module.exports.fetchChannels = fetchChannels