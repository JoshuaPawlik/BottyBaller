const economy = require('../../economy')

module.exports = {
    commands: ['change-nickname'],
    callback: async (args, interaction, reply, client) => {

        const userId = interaction.member.user.id
            console.log("Interaction=============>", interaction)
      
            let userBeans = await economy.getCoffeebeans(userId)
      
            if (userBeans < 30){
              reply(interaction, `You dont have enough coffeebeans for this! You need at least 30 <:coffeebeans:820214111887556638>!`)
              return 
            }
            else {
              const guildId = interaction.guild_id
              const guild = await client.guilds.cache.get(guildId)
              let givenUserId = (/<@!(.*?)>/.exec(args.member))
              if (!givenUserId){
                reply(interaction, `You need to @ the user who's nickname you would like to change`)
              }else {
                givenUserId = (/<@!(.*?)>/.exec(args.member))[1]
              }
              console.log("GIVENUSERID===============>", args.member)
              const member = await guild.members.fetch(givenUserId)
              member.setNickname(args.new_nickname)
              .then(() => {
                reply(interaction, `You have mentioned ${args.member} and changed their nickname to \`${args.new_nickname}\``)
                economy.subtractCoffeebeans(userId, 30)
                return
              }).catch(err => {
                  console.log(err.code)
                  if (err.code === 50013){
                    reply(interaction, `You can't change that person's nickname`)
                  } else if (err.code === 50035){
                    reply(interaction, `That nickname is too long`)
                  }else {
                    reply(interaction, `Looks like we encountered an unknown error, contact an admin with details on what went wrong`)
                  }
                return 
              })
            } 

    }
  }