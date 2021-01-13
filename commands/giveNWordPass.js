const fs = require('fs')

module.exports = {
    name: 'giveNWordPass',
    conductorOnly: true,
    aliases: [
        'giveNWordPass',
        'gnwp'
    ],
    execute(msg, args) {
        if (!fs.existsSync('assests/nword.json')) {
            fs.appendFileSync('assests/nword.json', '{}', (err) => {
                if (err) { throw err }
                //console.log('New nword.json file has been created!')
            })
        }

        const nword = JSON.parse(fs.readFileSync('assests/nword.json'))
        
        nword['passes'].push(args[1])

        fs.writeFileSync('assests/nword.json', JSON.stringify(nword, null, 4), (err) => {
            if (err) { throw err }
        })

        msg.channel.send(`${args[1]} has been cursed by the ability to say the N-WORD`)
    }
}