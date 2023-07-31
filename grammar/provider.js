function Instance(id) {
    return {
        name: 'provider',
        id,
        ts: Date.now()
    }
}

let instance = new Instance(0)

setInterval(() => {
    instance = new Instance(instance.id + 1);
    console.log("Update instance", instance.id)
}, 1000).unref()

module.exports = instance
