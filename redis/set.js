module.exports = async function(client) {
    await client.del("addrs")
    await client.sAdd("addrs", [ "Hangzhou", "Shanghai", "Beijing" ])

    let addrs = await client.sMembers("addrs")
    console.log('addrs', addrs)

    await client.sRem("addrs", [ "Shanghai" ])    
    addrs = await client.sMembers("addrs")
    console.log('addrs', addrs)
}