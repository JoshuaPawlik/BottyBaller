const economy = require('../economy')

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

            // console.log('After:', messageCache)
        }, 1000 * 2 * 60)
        
        economy.addCoffeebeans(id, (Math.floor(Math.random() * 3) + 1))
    })
}