const { init, quit } = require('./index')
const { expect } = require('chai')

before(init)
after(quit)

describe('Redis string', function() {

    it('Basic usage', async function() {
        const client = global.publisher;
        await client.set("foo", "alpha")
        await client.expire("foo", 1)

        const foo = await client.get("foo")
        const expire = await client.ttl("foo")
        const type = await client.type("foo")
        
        expect(foo).to.equal('alpha')
        expect(expire).to.equal(1)
        expect(type).to.equal('string')
    })

    it('Key/Value rename', async function() {
        let foo, bar;
        const client = global.publisher;
        
        await client.set("foo", "alpha")
        foo = await client.get("foo")
        expect(foo).to.equal('alpha')

        await client.rename("foo", "bar")
        foo = await client.get("foo")
        bar = await client.get("bar")
        expect(foo).to.equal(null)
        expect(bar).to.equal('alpha')
    })

    it('Atomatic increment', async function() {
        let hour
        const client = global.publisher;

        await client.set("hour", 0)
        hour = await client.incrBy("hour", 24)
        expect(hour).to.equal(24)

        hour = await client.decrBy("hour", 12)
        expect(hour).to.equal(12)
    })

    it('Expire', async function() {
        const client = global.publisher;
        await client.set("foo", "alpha")
        await client.set("bar", "beta")
        await client.expire("foo", 1)
        await client.expire("bar", 1)
        await client.persist("foo")

        setTimeout(async function() {
            const foo = await client.get("foo")
            const bar = await client.get("bar")
            expect(foo).to.equal('alpha')
            expect(bar).to.be.null
        }, 2000)
    })
})