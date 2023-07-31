/** redis subscribe */
const { expect } = require('chai')

describe('Redis subscribe', function() {
    it('Subscribe and publish', async function() {
        let count = 0;
        const publisher = global.publisher;
        const subscriber = global.subscriber;

        await subscriber.subscribe('channel', () => count += 1)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                publisher.publish('channel', 'hello')
            }, 500)
    
            setTimeout(() => {
                subscriber.unsubscribe('channel')
                expect(count).to.be.equal(1)
                resolve();
            }, 1000)
        })
    })
})