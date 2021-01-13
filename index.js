const Discord = require('discord.js')
const moment = require('moment')

const { API, prefix } = require('./assests/config.json')
const { login, setupCommands } = require('./setup')
const { punish, getFuckUpLines, getDefaultFuckUpLines, getNWordPasses, getFuckUpCount } = require('./tools')

const client = new Discord.Client()
client.commands = new Discord.Collection()

login(client, API)

setupCommands(client)

client.on('message', (msg) => {
    if (msg.author.bot) { return } //if the user is a bot

    if (getFuckUpLines().includes(msg.content) && !msg.member.roles.cache.some((r) => r.name == 'Conductor')) { punish(`<@!${msg.author.id}>`, true, msg) } //punish will made a fuckup
    else if (getDefaultFuckUpLines().includes(msg.content) && !msg.member.roles.cache.some((r) => r.name == 'Conductor')) { //if the nword is said
        if (!getNWordPasses().includes(msg.author.id || msg.author.username)) { //if the user don't have the nword pass
            punish(`<@!${msg.author.id}>`, false, msg) //punish him
            //msg.channel.send(`${getFuckUpCount(msg.author.id)}/3`) //notify of how many fuckups he has
            msg.channel.send(new Discord.MessageAttachment('assests/images/nword_pass.png')) //send cypher's image
        }
    }
    if (!msg.content.startsWith(prefix)) { return } //if is not a command
    const date = moment().format('YYYY/MM/DD/HH:MM:SS') //just get the date

    //msg without the prefix
    const args = msg.content.slice(prefix.length).trim().split('/ +/')
    console.log(`[${date}] ${msg.author.username} typed command: ${args}`)
    
    //get the command line
    const commandLine = args.shift().split(' ')

    //if is not the great Conductor and trying to use Conductor only commands
    //if (commandLine != 'info' && !msg.member.roles.cache.some((r) => r.name == 'Conductor')) { return msg.reply("You're not the Great Conductor!") }
    
    try {
        client.commands.find( (cmd) => {
            //execute the command the user is reffering to
            if (cmd.aliases.some((e) => e == commandLine[0])) {
                return cmd.execute(msg, msg.content.substring(prefix.length).trim().split(' '))
            }
        } )
    }
    catch(err) {
        console.error(err)
    }
})
