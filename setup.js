const { readdirSync } = require('fs')

module.exports = {
    login(client, token) {
        client.on('ready', () => {
            console.log('BIBLE MAN IS WATCHING!')
        }).login(token)
    },

    setupCommands(client) {
        const commandsFiles = readdirSync('commands')/*.filter( (file) => { file.endsWith('.js') } )*/
        
        for (const file of commandsFiles) {
            const command = require(`./commands/${file}`)

            client.commands.set(command.name, command)
        }
    },

    setupEvents(client) {
        
    }
}