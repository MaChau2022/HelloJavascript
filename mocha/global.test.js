const { expect } = require('chai')

describe('Check global', async function() {
    it('Check name', async function() {
        expect(global.name).to.be.equal('iduck')
    })
})