module.exports = async function(client) {
    await client.del("roster")
    await client.lPush("roster", [ "Bob", "Dove" ])
    
    let list = await client.lRange("roster", 0, -1)
    console.log('list', list)

    await client.lPop("roster")
    await client.lPush("roster", [ "Cassandra" ])
    await client.rPush("roster", [ "Alice" ])
    
    const length = await client.lLen("roster")
    list = await client.lRange("roster", 0, -1)
    console.log('list', list)
    console.log('length', length)
}