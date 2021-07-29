const redis = require("../../redis");
const economy = require('../../economy')

module.exports = {
    commands: ['setclaimed'],
    permissions: 'ADMINISTRATOR',
    callback: async (message, arguments) => {

        economy.setClaimedDailyOfAll(false);
        message.channel.send("All claimed daily's reset!")

    }
}   