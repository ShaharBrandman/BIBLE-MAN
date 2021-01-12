const { getFuckUpLines } = require("../tools")

module.exports = {
    name: 'test',
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