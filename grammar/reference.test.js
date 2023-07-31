const instance = require('./provider');
const { expect } = require('chai')

describe('Consumer', function() {
    it.only('Check instance', async function() {
        this.timeout(10000)
        let count = 0;
        await new Promise((resolve, reject) => {
            const clk = setInterval(() => {
                if (count > 3) {
                    clearInterval(clk)
                    resolve()
                    return
                }
                console.log(instance)
                expect(instance.id).to.be.equal(0)
                count += 1;
            }, 1000)
        })
    })
})
