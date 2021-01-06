// const {prefix, prefix2} = require('./config.json');

// module.exports = (client, aliases, callback) => {

//     if (typeof aliases === 'string'){
//         aliases = [aliases];
//     }

//     client.on('message',message => {

//         const {content} = message;

//         aliases.forEach(alias => {
//               const command = `${prefix}${alias}`;
//               const command2 = `${prefix2}${alias}`;

//               if(content.startsWith(`${command} `) || content === command){
//                   console.log(`Running the command ${command}`);
//                   callback(message);
//               }
//               else if (content.startsWith(`${command2} `) || content === command2){
//                 console.log(`Running the command ${command2}`);
//                 callback(message);
//               }
//         });
//     })
// }