const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

module.exports = (client) => {

}

module.exports.addCoins = async (guildId, userId, coins) => {
    console.log("Running find one and update")
    const result = await profileSchema.findOneAndUpdate({
        guildId,
        userId
    },{
        guildId,
        userId,
        $inc:{
            coins
        }
    },{
        upsert: true,
        new: true
    })
    
    console.log('Result', result);

    return result.coins;
}


module.exports.getCoins = async (guildId, userId) => {
    const result = await profileSchema.findOne({
        guildId,
        userId
    })

    console.log('Result', result)

    let coins = 0;
    if (result){
        coins = result.coins
    } else {
        console.log('Inserting a document')
        await new profileSchema({
            guildId,
            userId,
            coins
        }).save()
    }

    return coins;
}