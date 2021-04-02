const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

module.exports = (client) => {

}

module.exports.addCoffeebeans = async (guildId, userId, coffeebeans) => {
    console.log("Running find one and update")
    const result = await profileSchema.findOneAndUpdate({
        guildId,
        userId
    },{
        guildId,
        userId,
        $inc:{
            coffeebeans: coffeebeans
        }
    },{
        upsert: true,
        new: true
    })
    
    console.log('Result', result);

    return result.coffeebeans;
}


module.exports.getCoffeebeans = async (guildId, userId) => {
    const result = await profileSchema.findOne({
        userId
    })

    console.log('Result', result)

    let coffeebeans = 0;
    if (result){
        coffeebeans = result.coffeebeans
    } else {
        console.log('Inserting a document')
        await new profileSchema({
            guildId,
            userId,
            coffeebeans: coffeebeans
        }).save()
    }

    return coffeebeans;
}