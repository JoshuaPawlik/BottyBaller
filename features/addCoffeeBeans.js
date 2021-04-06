const mongo = require('../mongo')
const profileSchema = require('../schemas/profile-schema')

let messageCache = [];
module.exports = (client) => {
    client.on('message', async (message) => {
        const {author} = message
        const {id} = author

        if (author.bot || messageCache.includes(id)) return;

        messageCache.push(id)

        setTimeout(() => {
            console.log('Before:', messageCache)

            messageCache = messageCache.filter((string) => {
            return string !== id
            })

            console.log('After:', messageCache)
        }, 1000 * 2 * 60)
        
        const update = await profileSchema.findOneAndUpdate({
            userId:id 
        },{
            $inc: {
                'coffeebeans': Math.floor(Math.random() * 3) + 1  
            }
        },{
            upsert: true
        })       
    })
}