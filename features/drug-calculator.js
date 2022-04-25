const channels = require('../channels')


function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

// let phrases = [
//     "Better bring me my money bitch.",
//     "Get after it.",
//     "See ya when you bring me my money.",
// ];

module.exports = (client) => {
    client.on('message', async (message) => {
        
        let carryOn = await channels.carryOn(message, 'drug-calculator')
        if(!carryOn){
            return
        }
        else if (message.content.match(/^[0-9]{0,4} [mx]$/)){

            let args = message.content.split(" ")
            let amount = Number(args[0])
            let drug = args[1]
            let gangTake, yourTake, total = 0;
            let drugName = "";

            if (drug === 'm'){
                total = amount * 850
                gangTake = amount * 500
                yourTake = amount * 350
                drugName ="mushrooms"
            } else if (drug === 'x'){
                total = amount * 500
                gangTake = amount * 200
                yourTake = amount * 300
                drugName = "ecstasy"
            }
            gangTake = addCommas(String(gangTake)); yourTake = addCommas(String(yourTake)); total = addCommas(String(total));
            message.channel.send(`**For ${amount} ${drugName}:** \n \n **Total is:** $${total}(d) \n **Your take is:** $${yourTake}(d) \n **Gang take is:** $${gangTake}(d) \n Better bring me my money bitch.`)
         } else {
            // message.channel.send("Your message does not match the required input. Dumbass. It should look something like: \n `20 m` or `100 x`").then(msg => {
            //         message.delete();
            //         msg.delete({timeout: 10000});
            // }).catch(console.error);

            return
        }
    })
    return
}