const { getFuckUpCount } = require("../tools")

module.exports = {
    name: 'getFuckUps',
    conductorOnly: false,
    aliases: [
        'getFuckUps',
        'gfus'
    ],
    execute(msg, args) {
        msg.channel.send(`${args[1]} has ${getFuckUpCount(args[1])}/3 fuckups..`)
    }
}