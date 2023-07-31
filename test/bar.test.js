const { expect } = require('chai')
const { describe } = require('mocha')

before(function() {
    console.log("  Use hook before")
    global.name = 'iduck';
})

after(function() {
    console.log("  Use hook after")
})

describe('Bar', async function() {
    it('Check plus', async function() {
        expect(1 + 1).to.be.equal(2)
    })

    it('Check plus later', async function() {
        this.timeout(10000)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                expect(1 + 1).to.be.equal(2)
                resolve()
            }, 5000)
        })
    })
})