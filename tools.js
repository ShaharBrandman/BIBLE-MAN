const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    
    //punish the user and raise his fuckup score by 1
    //and send an image if the developer wants to
    punish(user, sendImage, msg) {
        const image = new Discord.MessageAttachment('assests/images/mood.png')
        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        let newCount
        
        if (!fuckups[user]) {
            newCount = 1
        }
        else {
            newCount = String(Number(((fuckups[user])['count']))+1)
            if (newCount >= 3) {
                newCount = 3
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
            msg.channel.send(`${newCount}/3`)
        }
    },

    //get the user fuckup count
    getFuckUpCount(user) {
        const fuckups = JSON.parse(fs.readFileSync('assests/fuckups.json'))

        return (fuckups[user])['count']
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

    getDefaultFuckUpLines() {
        return (JSON.parse(fs.readFileSync('assests/fuckupslines.json', 'utf-8')))['default']
    }
}