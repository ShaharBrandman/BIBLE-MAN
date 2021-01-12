const { readdirSync, readFileSync } = require('fs')

module.exports = {
    //login and alert the host
    login(client, token) {
        client.on('ready', () => {
            console.log('BIBLE MAN IS WATCHING!')
        }).login(token)
    },

    //set all the files in the commands folder as a new command if it has a name
    setupCommands(client) {
        const commandsFiles = readdirSync('commands')
        
        for (const file of commandsFiles) {
            const command = require(`./commands/${file}`)

            client.commands.set(command.name, command)
        }
    }
}