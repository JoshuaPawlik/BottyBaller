const redis = require('redis')
const redisPath = process.env.REDIS_PATH;

let client = null;
let sub = null;
let pub = null;
module.exports = async () => {

  if (client === null){
    console.log("NEW CLIENT")
    return await new Promise((resolve, reject) => {
      client = redis.createClient({
        url: redisPath,
      })
  
      client.on('error', (err) => {
        console.error('Redis error:', err)
        client.quit()
        reject(err)
      })
  
      client.on('ready', () => {
        console.log("Connected to redis")
        resolve(client)
      })
    }) 
  } else {
    console.log("OLD CLIENT")
    return client;
  }
}

module.exports.expire = (callback) => {
  const expired = () => {
    if (sub === null){
      sub = redis.createClient({ url: redisPath })
      sub.subscribe('__keyevent@0__:expired', () => {
        sub.on('message', (channel, message) => {
          console.log("A redis key has expired ====>", message);
          callback(message)
        })
      })
    }
  }

  if (pub === null){
    pub = redis.createClient({ url: redisPath })
  }
  pub.send_command('config', ['set', 'notify-keyspace-events', 'Ex'], expired())
}
