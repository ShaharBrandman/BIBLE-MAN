const Discord = require('discord.js')

module.exports = {
    name: 'info',
    execute(msg) {
        msg.reply(new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Bible man')    
                .setDescription('Author: Shahar Brandman')
                .addField("Bible man's commands prefix: ", 'b!')
                .addField('Conductor only commands:', 'giveFuckUp <user> <count> \n removeFuckUp <user> <count> \n setFuckUpCommand <new command> \n removeFuckUpCommand <actual command> \n giveNWordPass <user> \n revokeNWordPass <user>')
                .addField('Normal human beings commands:', 'info')
                .setFooter('Version: 1.0.0')
                )
    }
}