const { expect } = require('chai')

describe('Redis array', function() {

    it('Basic usage', async function() {
        const client = global.publisher; 
        await client.del("roster")
        await client.lPush("roster", [ 'Alice', 'Bob', 'Dove' ])

        const list = await client.lRange("roster", 0, -1)
        const type = await client.type("roster")
        const len = await client.lLen("roster")
        expect(list).to.deep.equal([ 'Dove', 'Bob', 'Alice' ])
        expect(type).to.equal('list')
        expect(len).to.equal(3)
    })

    it('Stack', async function() {
        let list;
        const client = global.publisher; 

        /** reverse */
        await client.lPop("roster")
        await client.lPush("roster", [ "Cassandra" ])
        list = await client.lRange("roster", 0, -1)
        expect(list).to.deep.equal([ 'Cassandra', 'Bob', 'Alice' ])
        
        /** default */
        await client.rPop("roster")
        await client.rPush("roster", [ "Ellie" ])
        list = await client.lRange("roster", 0, -1)
        expect(list).to.deep.equal([ 'Cassandra', 'Bob', 'Ellie' ])
    })

    it('Set', async function() {
        const client = global.publisher;

        await client.del("roster")
        await client.sAdd("roster", [ 'Alice', 'Bob', 'Dove', 'Alice' ])

        const list = await client.sMembers("roster")
        const type = await client.type("roster")
        const len = await client.sCard("roster")

        expect(list).to.deep.equal([ 'Bob', 'Dove', 'Alice' ])
        expect(type).to.equal('set')
        expect(len).to.equal(3)
    })
})