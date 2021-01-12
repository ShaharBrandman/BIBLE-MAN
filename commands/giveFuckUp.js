const fs = require('fs')
const { punish, getFuckUpCount } = require('../tools')

module.exports = {
    name: 'giveFuckUp',
    aliases: [
        'giveFuckUp',
        'gfp'
    ],
    execute(msg, args) {
        if (!fs.existsSync('assests/fuckups.json')) {
            fs.appendFileSync('assests/fuckups.json', '{}', (err) => {
                if (err) { throw err }
                //console.log('New fuckups.json file has been created!')
            })
        }

        //don't send mood.png
        punish(args[1])

        msg.channel.send(`${args[1]} is being unholy. \n${getFuckUpCount(args[1])}/3.`)
    }
}