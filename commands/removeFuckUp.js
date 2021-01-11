const fs = require('fs')

module.exports = {
    name: 'removeFuckUp',
    aliases: 'removeFuckUp',
    execute(msg, args) {
        if (!fs.existsSync('assests/fuckups.json')) {
            fs.appendFileSync('assests/fuckups.json', '{}', (err) => {
                if (err) { throw err }
                console.log('New fuckups.json file has been created!')
            })
        }

        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        let newCount

        if (!fuckups[args[1]]) {
            newCount = 0
        }
        else {
            newCount = String(Number(((fuckups[args[1]])['count']))-1)
            if (newCount < 0) {
                newCount = 0
            }
        }

        fuckups[args[1]] = {
            count: `${newCount}`
        }

        fs.writeFileSync('assests/fuckups.json', JSON.stringify(fuckups, null, 4), (err) => {
            if (err) { throw err }
        })

        msg.channel.send(`${args[1]} is a good chrsitian boy. \n ${newCount}/3`)
    }
}