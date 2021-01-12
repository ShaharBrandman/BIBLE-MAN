const fs = require('fs')

module.exports = {
    name: 'removeFuckUpCommand',
    aliases: [
        'removeFuckUpCommand',
        'rfuc'
    ],
    execute(msg, args) {
        if (!fs.existsSync('assests/fuckupslines.json')) {
            fs.appendFileSync('assests/fuckupslines.json', '{}', (err) => {
                if (err) { throw err }
                //console.log('New fuckups.json file has been created!')
            })
        }

        const fuckuplines = JSON.parse(fs.readFileSync('assests/fuckupslines.json'))
        
        //fuckuplines['lines'].splice(fuckuplines['lines'].indexOf(msg.content.slice(8)), 1)

        if (args[0] == 'removeFuckUpCommand') {
            fuckuplines['lines'].splice(fuckuplines['lines'].indexOf(msg.content.slice(20)), 1)

            msg.channel.send(`${msg.content.slice(20)} is no longer a fuckup`)
        }
        else {
            fuckuplines['lines'].splice(fuckuplines['lines'].indexOf(msg.content.slice(8)), 1)

            msg.channel.send(`${msg.content.slice(8)} is no longer a fuckup`)
        }

        fs.writeFileSync('assests/fuckupslines.json', JSON.stringify(fuckuplines, null, 4), (err) => {
            if (err) { throw err }
        })
    }
}