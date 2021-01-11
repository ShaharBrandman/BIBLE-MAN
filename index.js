const Discord = require('discord.js')
const moment = require('moment')

const { API, prefix } = require('./assests/config.json')
const { login, setupCommands } = require('./setup')

const client = new Discord.Client()
client.commands = new Discord.Collection()

login(client, API)

setupCommands(client)

client.on('message', (msg) => {
    if (!msg.content.startsWith(prefix)) { return }
    const date = moment().format('YYYY/MM/DD/HH:MM:SS')

    //msg without the prefix
    const args = msg.content.slice(prefix.length).trim().split('/ +/')
    console.log(`[${date}] ${msg.author.username} typed command: ${args}`)
    const commandLine = args.shift().split(' ')
    
    try {
        client.commands.find( (cmd) => {
            if (String(cmd.aliases).includes(commandLine[0])) {
                return cmd.execute(msg, msg.content.substring(prefix.length).trim().split(' '), date)
            }
        } )
    }
    catch(err) {
        console.error(err)
    }
})
