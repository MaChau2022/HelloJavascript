const { expect } = require('chai')

describe('Foo', async function() {
    it('Check name', async function() {
        expect(global.name).to.be.equal('iduck')
    })
})