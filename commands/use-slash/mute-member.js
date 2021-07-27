const economy = require('../../economy')

module.exports = {
    commands: ['mute-member'],
    callback: async (args, interaction, reply, client) => {

        const userId = interaction.member.user.id
            // console.log("Interaction=============>", interaction)
            console.log("Args=============>", args)
      
            let givenUserId = (/<@!(.*?)>/.exec(args.member))
            let givenTime = Number(args.duration);
            
            if (!givenUserId){
                reply(interaction, `You need to @ the user who you would like to mute`)
            } else {
                givenUserId = givenUserId[1];
                console.log("GIVEN USER ID ++++++>", givenUserId);
            }
            
            if (!givenTime){
                reply(interaction, `The given duration must be a number`)
            }
            else if (givenTime > 10){
                reply(interaction, `The given duration is too long! CHILL!`)
            }
            
            let userBeans = await economy.getCoffeebeans(userId)
            const totalBeans = 25 * givenTime
            if (userBeans < totalBeans){
                reply(interaction, `You don't have enough beans for this!`)
            } else {
                const guildId = interaction.guild_id
                const guild = await client.guilds.cache.get(guildId)
                let role = guild.roles.cache.find(role => role.name === "Muted");

                let member = await guild.members.fetch(givenUserId)
                await member.fetch(true)

                console.log("Member =====>", member);

                if (member.roles.cache.some(role => role.name === 'Muted')) {
                    reply(interaction, `That member is already muted!`)
                    return;
                }

                economy.subtractCoffeebeans(userId, totalBeans)
                await member.roles.add(role)

                const timeInMinutes = givenTime * 60 * 1000
                setTimeout(() => { 
                    member.roles.remove(role)
                }, timeInMinutes);


                reply(interaction, `You have muted <@${givenUserId}> for ${givenTime} minutes!`)



            }
    }
  }