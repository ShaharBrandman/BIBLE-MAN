const fs = require('fs')

module.exports = {
    name: 'giveFuckUp',
    aliases: 'giveFuckUp',
    execute(msg, args, date) {
        if (!fs.existsSync('assests/fuckups.json')) {
            fs.appendFileSync('assests/fuckups.json', '{}', (err) => {
                if (err) { throw err }
                console.log(`[${date}]: New fuckups.json file has been created!`)
            })
        }

        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        let newCount
        
        //if (!fuckups[args[2]]) {
        //    newCount = 0
        //}
        //else {
        //    if ( (fuckups[args[2]])['count'] == 2 ) {
        //        newCount = 0
        //    }
        //    else {
        //        newCount = (fuckups[args[2]])['count']++
        //    }
        //}

        if (!fuckups[args[1]]) {
            newCount = 0
        }
        else {
            newCount == Number((fuckups[args[1]])['count'])++
        }

        fuckups[args[1]] = {
            count: `${newCount}`
        }

        console.log(fuckups)

        fs.writeFileSync('assests/fuckups.json', JSON.stringify(fuckups, null, 4), (err) => {
            if (err) { throw err }
            msg.reply(`${args[1]} has a total of ${newCount}/3 fuckups`)
        })

    }
}

//cunt
function getDetails(json, user) {
    try {
        json.user = {
            count: Number((json[user])['count'] + 1)
        }
    }
    catch{
        json.user = {
            count: 0
        }
    }

    return json
}