const redis = require("../../redis");
const economy = require('../../economy')

module.exports = {
    commands: ['daily'],
    callback: async (message, arguments) => {
        const userId = message.author.id;
        const dailyKeyPrefix = 'daily-';
        // const guildId = message.guild.id;
        const redisClient = await redis();
        // economy.setClaimedDaily(userId, false);
        let claimedDaily = await economy.getClaimedDailyStatus(userId);

        if (claimedDaily === false){
            economy.addCoffeebeans(userId, 25).then(() => {
                economy.setClaimedDaily(userId, true);
            })
            redisClient.set(`${dailyKeyPrefix}${userId}`, true,'EX', 86400);
            message.channel.send("You have claimed your daily 25 <:coffeebeans:820214111887556638>!");
        } else {
            message.channel.send("You must wait a full 24 hours before claiming your daily again!");
        }

        redis.expire(message => {
            if (message.startsWith(dailyKeyPrefix)){
                const split = message.split('-');
                economy.setClaimedDaily(split[1], false);
            }
        }) 

    }
}   