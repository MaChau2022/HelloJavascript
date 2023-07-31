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
    it('Add', async function() {
        expect(1 + 1).to.be.equal(2)
    })
})