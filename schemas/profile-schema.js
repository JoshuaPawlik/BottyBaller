const mongoose = require('mongoose')

const reqString = {
    type:String,
    required:true
}

const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    coffeebeans: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('profiles', profileSchema)