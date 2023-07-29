module.exports = async function(client) {
    await client.set("app", "redis")
    await client.expire("app", 1)

    const app = await client.get("app")
    const expire = await client.ttl("app")
    const type = await client.type("app")
    console.log('app:', app)
    console.log('expire:', expire)
    console.log('type:', type)
    
    setTimeout(async function() {
        const app = await client.get("app")
        console.log('next:', app)
    }, 2000)
    
    await client.set("date", Date.now())
    let date = await client.get("date")
    console.log('date: ', date)

    /** delete */
    await client.del("date")
    date = await client.get("date")
    console.log('delete: ', date)
}
