const fs = require('fs')

module.exports = {
    name: 'revokeNWordPass',
    conductorOnly: 'true',
    aliases: [
        'revokeNWordPass',
        'rnwp'
    ],
    execute(msg, args) {
        if (!fs.existsSync('assests/nword.json')) {
            fs.appendFileSync('assests/nword.json', '{}', (err) => {
                if (err) { throw err }
                //console.log('New nword.json file has been created!')
            })
        }

        const nword = JSON.parse(fs.readFileSync('assests/nword.json'))
        
        nword['passes'].splice(args[1], 1)

        fs.writeFileSync('assests/nword.json', JSON.stringify(nword, null, 4), (err) => {
            if (err) { throw err }
        })

        msg.channel.send(`${args[1]}'s N-Word pass has been revoked by the Great Conductor!`)
    }
}