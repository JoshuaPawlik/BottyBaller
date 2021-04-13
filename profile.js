const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

module.exports = (client) => {

}

module.exports.addReputation = async (userId, rep) => {
    const result = await profileSchema.findOneAndUpdate({
        userId
    },{
        userId,
        $inc:{
            reputation: rep
        }
    },{
        upsert: true,
        new:true
    })
    
    console.log('Result', result);

    return result.rep;
}

module.exports.subtractReputation = async (userId, rep) => {
    const result = await profileSchema.findOneAndUpdate({
        userId
    },{
        userId,
        $inc:{
            rep: -rep
        }
    },{
        upsert: true,
        new: true
    })
    
    console.log('Result', result);

    return result.rep;
}


module.exports.getRep = async (userId) => {
    const result = await profileSchema.findOne({
        userId
    })

    console.log('Result', result)

    let reputation = 0;
    if (result){
        reputation = result.reputation
    } else {
        console.log('Inserting a document')
        await profileSchema.findOneAndUpdate({
            userId
        },{
            reputation: 0
        },{
            upsert: true,
            new: true
        })
        return 0;
    }

    return reputation;
}