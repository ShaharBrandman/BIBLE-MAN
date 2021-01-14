const { getFuckUpLines } = require('../tools')

module.exports = {
    name: 'getFuckUpLines',
    conductorOnly: false,
    aliases: [
        'getFuckUpLines',
        'gful'
    ],
    execute(msg, args) {
        const fuckuplines = getFuckUpLines()

        if (msg.member.roles.cache.some((r) => r.name == 'Conductor')) {
            msg.reply(`Hello oh Great Conductor.. I'll punish who are says the n-word or will say, ${fuckuplines}`)
        }
        else if (fuckuplines.length == 1) {
            msg.reply(`I'll punish you if you'll say the n-word or if this unholy line will be spilled on these grounds, ${fuckuplines}`)
        }
        else {
            msg.reply(`I'll punish you if you'll say the n-word or if one of these unholy lines will be spilled on these grounds, ${fuckuplines}`)
        }
    }
}