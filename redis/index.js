const redis = require("redis")

const subscriber = redis.createClient({
    host: '127.0.0.1',
    port: '6379'
}) 
const publisher = redis.createClient({
    host: '127.0.0.1',
    port: '6379'
}) 

async function init() {
    await subscriber.connect();
    await publisher.connect();

    global.subscriber = subscriber;
    global.publisher = publisher;
    console.log("  Redis init")
}

async function quit() {
    console.log("  Redis quit")
    await subscriber.disconnect()
    await publisher.disconnect()
}


module.exports = {
    init,
    quit,
}