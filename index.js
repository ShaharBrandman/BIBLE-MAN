const Discord = require('discord.js')
const moment = require('moment')

const { API, prefix } = require('./assests/config.json')
const { login, setupCommands } = require('./setup')

const client = new Discord.Client()
client.commands = new Discord.Collection()

login(client, API)

setupCommands(client)

client.on('message', (msg) => {
    const date = moment().format('YYYY/MM/DD/HH:MM:SS')

    //msg without the prefix basically
    //const args = msg.content.slice(prefix.length).trim().split('/ +/')
    console.log(`[${date}] message: ${msg.content}`)

    //the command template
    const command = msg.content.slice(prefix.length).trim().split('/ +/').shift().toLowerCase()
    console.log(`[${date}] command: ${command}`)

    //if there isn't any commands for the message template
    if (!client.commands.has(command)) { return console.log('cunt')}

    //execute commands dynamically
    try {
        client.commands.get(command).execute(msg, args)
    }
    catch (err) {
        console.error(err)
    }
})

