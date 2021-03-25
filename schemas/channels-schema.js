const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const channelsSchema = mongoose.Schema({
  // Guild ID
  guildId: reqString,
  command: reqString,
  channels: [{
    type: String,
    }]
})

module.exports = mongoose.model('channels', channelsSchema)