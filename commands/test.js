const { getFuckUpLines } = require("../tools")

module.exports = {
    name: 'test',
    conductorOnly: 'true',
    aliases: [
        'test',
        't',
        '-t'
    ],
    execute(msg) {
        msg.channel.send('The congress demand your PENIS')
        console.log(getFuckUpLines())
    }
}