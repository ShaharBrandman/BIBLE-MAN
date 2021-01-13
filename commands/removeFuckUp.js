const fs = require('fs')
const { forgive, getFuckUpCount } = require('../tools')

module.exports = {
    name: 'removeFuckUp',
    conductorOnly: true,
    aliases: [
        'removeFuckUp',
        'rfu'
    ],
    execute(msg, args) {
        if (!fs.existsSync('assests/fuckups.json')) {
            fs.appendFileSync('assests/fuckups.json', '{}', (err) => {
                if (err) { throw err }
                //console.log('New fuckups.json file has been created!')
            })
        }

        forgive(args[1], true, msg)

        msg.channel.send(`${args[1]} is a good chrsitian boy. \n ${getFuckUpCount(args[1])}/3`)
    }
}