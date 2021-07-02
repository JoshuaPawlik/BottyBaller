const mongoose = require('mongoose')

const reqString = {
    type:String,
    required:true,
    unique: true
}

const profileSchema = mongoose.Schema({
    userId: reqString,
    coffeebeans: {
        type: Number,
        default: 0
    },
    reputation: {
        type: Number,
        default: 0
    },
    claimedDaily: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('profiles', profileSchema)