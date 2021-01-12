const fs = require('fs')

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

        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        let newCount
        
        if (!fuckups[args[1]]) {
            newCount = 1
        }
        else {
            newCount = String(Number(((fuckups[args[1]])['count']))+1)
            if (newCount >= 3) {
                newCount = 3
            }
        }

        fuckups[args[1]] = {
            count: `${newCount}`
        }

        fs.writeFileSync('assests/fuckups.json', JSON.stringify(fuckups, null, 4), (err) => {
            if (err) { throw err }
        })

        msg.channel.send(`${args[1]} is being unholy. \n${newCount}/3.`)

    }
}