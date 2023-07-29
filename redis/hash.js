module.exports = async function(client) {
    await client.hSet("duck", {
        name: "iduck",
        age: 15,
        color: "yellow",
        addr: "Hangzhou"
    })

    const name = await client.hGet("iduck", "name")
    const duck = await client.hGetAll("duck")
    console.log(name, duck)

    await client.hSet
}
