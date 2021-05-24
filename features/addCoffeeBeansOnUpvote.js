const economy = require('../economy')
const channels = require('../channels')
const profile = require('../profile')
let upvoteCache = [];
const { channelsCache } = channels;
module.exports = (client) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        if (user.bot === true) return;
        const { message, emoji } = reaction
        if (emoji.name !== '<:upvote:767990923875319809>' && emoji.name !== '👍') return;

        // console.log("User object ===> ",user)
        // console.log("Reaction object ===> ",reaction)
        const messageAuthor = message.author
        const channelId = message.channel.id

        if (user.id === messageAuthor.id) return; //Do not forget to uncomment this!!!!!!!!!!!!!!
        if (!channelsCache[message.guild.id]['upDown'].includes(channelId)) return;
        else if (upvoteCache.includes(`${user.id}-${message.id}`)) return;
        else {
            upvoteCache.push(`${user.id}-${message.id}`)
            // console.log(upvoteCache);
    
            const update = await economy.addCoffeebeans(messageAuthor.id, 1);
            await profile.addReputation(messageAuthor.id, 1);
            console.log(update);
            return;
        }
    })
}