/** redis subscribe */
module.exports = async function(subscriber, publisher) {
    await subscriber.subscribe('channel_1', console.log)
    await subscriber.subscribe('channel_2', console.log)

    setTimeout(() => {
        subscriber.unsubscribe('channel_2')
    }, 3000)

    setInterval(() => {
        publisher.publish('channel_1', 'hello')
        publisher.publish('channel_2', 'hi')
    }, 1000)
}