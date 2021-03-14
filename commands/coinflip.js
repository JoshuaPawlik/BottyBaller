module.exports = {
    commands: ['coinflip', 'flip'],
    callback: (message, arguments, text) => {

       function flip(num) {
        if (num === 1){
            message.channel.send("It's Heads!");
        } else {
            message.channel.send("It's Tails!");
        }
       }

        var num = Math.floor((Math.random() * 2) + 1)
        console.log("NUM ----->", num);

        message.channel.send("Flipping...");
        setTimeout(flip, 2000, num);


        return;
    }
}