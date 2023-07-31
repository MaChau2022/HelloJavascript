const { expect } = require("chai")

describe("Redis hash", function() {
    it("Basic usage", async function() {
        const client = global.publisher; 
        const data = {
            name: "iduck",
            age: "15",
            color: "yellow",
            addr: "Hangzhou"
        }

        await client.del("duck")
        await client.hSet("duck", data)

        const name = await client.hGet("iduck", "name")
        const duck = await client.hGetAll("duck")
        const type = await client.type("duck")
        const length = await client.hLen("duck")
        expect(name).to.equal("iduck")
        expect(duck).to.deep.equal(data)
        expect(type).to.equal("hash")
        expect(length).to.equal(4)

        await client.hSet("duck", "age", 16)
        await client.hDel("duck", "addr")
        const addr = await client.hGet("duck", "addr")
        const age = await client.hGet("duck", "age")
        expect(addr).to.be.null
        expect(age).to.equal('16')
    })
})