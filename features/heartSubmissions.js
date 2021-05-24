const channels = require('../channels')

module.exports = (client) => {
    client.on('message', async (message) => {
        
        let carryOn = await channels.carryOn(message, 'heartSubmissions')
        if(!carryOn){
            return
        }
        else if (message.attachments.size > 0){
            message.react("❤️")
                 .catch(err => {
                    console.error(err)
                })
            return;
        }
    })
    return
}