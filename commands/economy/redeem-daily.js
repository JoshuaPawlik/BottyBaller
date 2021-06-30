const redis = require("../../redis");
const economy = require('../../economy')

module.exports = {
    commands: ['daily'],
    callback: async (message, arguments) => {
        const userId = message.author.id;
        const dailyKeyPrefix = 'daily-';
        const redisClient = await redis();
        let claimedDaily = await economy.getClaimedDailyStatus(userId);
        
        redis.expire(message => {
            if (message.startsWith(dailyKeyPrefix)){
                const split = message.split('-');
                economy.setClaimedDaily(split[1], false);
            }
        })
    
        if (!claimedDaily){
            try {
                if (message.member.roles.cache.some(role => role.name === 'Caffeinated')) {
                    economy.addCoffeebeans(userId, 40).then(() => {
                        economy.setClaimedDaily(userId, true);
                        message.channel.send("You have claimed your daily 40 <:coffeebeans:820214111887556638>!");
                    })
                } else {
                    economy.addCoffeebeans(userId, 25).then(() => {
                        economy.setClaimedDaily(userId, true);
                        message.channel.send("You have claimed your daily 25 <:coffeebeans:820214111887556638>!");
                    })
                }
                redisClient.set(`${dailyKeyPrefix}${userId}`, true,'EX', 86400 );
                // redisClient.set(`${dailyKeyPrefix}${userId}`, true,'EX', 10 );
            } 
            finally {
                // redisClient.quit();
            }
        } else {
            message.channel.send("You must wait a full 24 hours before claiming your daily again!");
        }
    }
}   