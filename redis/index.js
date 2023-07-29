const redis = require("redis")
const useKey = require("./value")
const useHash = require('./hash')
const useArray = require('./list')
const useSet = require('./set')
const useEvent = require('./event')

const subscriber = redis.createClient({
    host: '127.0.0.1',
    port: '6379'
}) 
const publisher = redis.createClient({
    host: '127.0.0.1',
    port: '6379'
}) 

Promise.all([
    subscriber.connect(),
    publisher.connect()
]).then((res) => {
    useEvent(subscriber, publisher)
})