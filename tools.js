const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    
    //punish the user and raise his fuckup score by 1
    //and send an image if the developer wants to
    punish(user, sendImage, msg) {
        //if (msg.member.roles.cache.some((r) => r.name == 'Conductor')) { return }
        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        let newCount, temp
        
        if (!fuckups[user]) {
            newCount = 1
            temp = 1
        }
        else {
            newCount = String(Number(((fuckups[user])['count']))+1)
            temp = newCount
            if (newCount >= 3) {
                newCount = 0
                temp = 3
                msg.member.kick()
                console.log(`${user} has fucked up to many times!`)
            }
        }

        fuckups[user] = {
            count: `${newCount}`
        }

        fs.writeFileSync('assests/fuckups.json', JSON.stringify(fuckups, null, 4), (err) => {
            if (err) { throw err }
        })

        if (sendImage) {
            msg.reply(new Discord.MessageAttachment('assests/images/mood.png'))
            msg.channel.send(`${temp}/3`)
        }

    },

    //get the user fuckup count
    getFuckUpCount(user) {
        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        try {
            return (fuckups[user])['count']
        }
        catch{
            return 0
        }
    },

    //lower the user fuckup score by one if he was a good chrisitian boi
    forgive(user, sendImage, msg) {
        const image = new Discord.MessageAttachment('assests/images/good_christian.png')
        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        let newCount

        if (!fuckups[user]) {
            newCount = 0
        }
        else {
            newCount = String(Number(((fuckups[user])['count']))-1)
            if (newCount < 0) {
                newCount = 0
            }
        }

        fuckups[user] = {
            count: `${newCount}`
        }

        fs.writeFileSync('assests/fuckups.json', JSON.stringify(fuckups, null, 4), (err) => {
            if (err) { throw err }
        })

        if (sendImage) {
            msg.reply(image)
        }
    },
    
    //get the fuckup lines
    getFuckUpLines() {
        return (JSON.parse(fs.readFileSync('assests/fuckupslines.json', 'utf-8')))['lines']
    },

    //get nigger lines
    getDefaultFuckUpLines() {
        return (JSON.parse(fs.readFileSync('assests/fuckupslines.json', 'utf-8')))['default']
    },
    
    //get all users that were given the nword pass
    getNWordPasses() {
        return (JSON.parse(fs.readFileSync('assests/nword.json', 'utf-8')))['passes']
    }
}