const mongo = require('./mongo')
const channelsSchema = require('./schemas/channels-schema')

let channelsCache = {};

const validCommands = [
    'tot',
    'upDown',
    'emojiSubmissions',
    'confessions',
    'deathnote'
]

const fetchChannels = async (guildId, command) => {
    console.log("channelsCache", channelsCache)
    let query = {}

  if (guildId) {
    query.guildId = guildId
    query.command = command
  }
  console.log("Fetching channels, QUERY =====>", query)
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

const carryOn = async (message, command) => {

    const guildId = message.guild.id;
    if (message.author.bot){
        return false;
    }
    
    const includes = await module.exports.cacheIncludes(command, guildId, message.channel.id ) 
    if( !includes ){
        return false;
    }

    return true
}

const getChannelOfCommand = async (channelId, guildId, command) => {

    // const includes = await module.exports.cacheIncludes(command, guildId, channelId ) 
    // if( !includes ){
    //     return false;
    // }
     
    if(channelsCache[guildId][command] && channelsCache[guildId][command].length > 0) {
        return channelsCache[guildId][command][0]
    } else {
        return null
    }
}

module.exports = (client) => {
    fetchChannels()
}

module.exports.cacheIncludes = async (command, guildId, channelId) => {
    if (channelsCache[guildId] && channelsCache[guildId][command]){
        return (channelsCache[guildId][command].includes(channelId))
    } else{
        return false
    }
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

module.exports.setChannel = async (guildId, command, channelId) => {
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

module.exports.removeChannel = async (guildId, command, channelId) => {
    const result = await channelsSchema.updateMany({
        guildId
    },{
        $pull: {
            channels: channelId
        }
    },{
        upsert: true,
        new: true,
        multi: true
    })

    return result;
}

module.exports.fetchChannels = fetchChannels
module.exports.carryOn = carryOn
module.exports.validCommands = validCommands
module.exports.channelsCache = channelsCache
module.exports.getChannelOfCommand = getChannelOfCommand