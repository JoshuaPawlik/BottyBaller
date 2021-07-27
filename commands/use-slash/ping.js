module.exports = {
    commands: ['ping'],
    callback: (args, interaction, reply) => {
        reply(interaction, 'pong')
        console.log("INTERACTION in here ==============>",interaction)
    },
  }