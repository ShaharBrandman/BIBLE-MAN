const fs = require('fs')

module.exports = {
    name: 'setFuckUpCommand',
    aliases: [
        'setFuckUpCommand',
        'sfuc'
    ],
    execute(msg, args) {
        if (!fs.existsSync('assests/fuckupslines.json')) {
            fs.appendFileSync('assests/fuckupslines.json', '{}', (err) => {
                if (err) { throw err }
                //console.log('New fuckups.json file has been created!')
            })
        }

        const fuckuplines = JSON.parse(fs.readFileSync('assests/fuckupslines.json'))

        if (args[0] == 'setFuckUpCommand') {
            let fuckup = msg.content.slice(20)

            if (fuckuplines['lines'].includes(fuckup)) { return msg.reply('That is already a fuckup..') }

            fuckuplines['lines'].push(fuckup)
            //msg.channel.send(`${fuckup} has been set as a fuckup!`)
        }
        else {
            let fuckup = msg.content.slice(8)

            if (fuckuplines['lines'].includes(fuckup)) { return msg.reply('That is already a fuckup..') }

            fuckuplines['lines'].push(fuckup)
            //msg.channel.send(`${fuckup} has been set as a fuckup!`)
        }

        fs.writeFileSync('assests/fuckupslines.json', JSON.stringify(fuckuplines, null, 4), (err) => {
            if (err) { throw err }
        })

        msg.channel.send(`${fuckuplines['lines'].pop()} is offically a new fuckup`)
    }
}