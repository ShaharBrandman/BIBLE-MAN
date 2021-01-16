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
    if (msg.channel.type == 'dm') { return }
    
    getFuckUpLines().forEach( (e) => {
        const msgArray = msg.content.trim().split(' ')
        for(i in msgArray) {
            if (msgArray[i] == e && !msg.member.roles.cache.some((r) => r.name == 'Conductor')) {
                punish(`<@!${msg.author.id}>`, true, msg)
            }
        }
    })

    getDefaultFuckUpLines().forEach( (e) => {
        const msgArray = msg.content.trim().split(' ')
        for(i in msgArray) {
            if (msgArray[i] == e && !msg.member.roles.cache.some((r) => r.name == 'Conductor')) {
                if (!getNWordPasses().includes(msg.author.id || msg.author.username)) {
                    punish(`<@!${msg.author.id}>`, false, msg)
                    msg.channel.send(new Discord.MessageAttachment('assests/images/nword_pass.png'))
                }
            }
        }
    } )
    
    if (!msg.content.startsWith(prefix)) { return } //if is not a command
    
    //msg without the prefix
    const args = msg.content.slice(prefix.length).trim().split('/ +/')
    //console.log(`[${moment().format('YYYY/MM/DD/HH:MM:SS')}] ${msg.author.username} typed command: ${args}`)
        
    //get the command line
    const commandLine = args.shift().split(' ')
        
    try {
        client.commands.find( (cmd) => {
            //execute the command the user is reffering to
            if (cmd.aliases.some((e) => e == commandLine[0])) {
        
                if ( (cmd.conductorOnly ) && ( !msg.member.roles.cache.some((r) => r.name == 'Conductor') ) ) { return msg.reply("You're not the Great Conductor!") }
                        
                return cmd.execute(msg, msg.content.substring(prefix.length).trim().split(' '))
        
            }
        } )
    }
    catch(err) {
        return
    }
})
