function myNew(Constructor, ...args) {
    const object = Object.create(Constructor.prototype)
    const result = Constructor.apply(object, args)
    return typeof result === 'object' ? result : object
}

function Iduck(color) {
    this.name = 'iduck'
    this.age = 15
    this.color = color
    
    return true;
}

console.log(myNew(Iduck, 'yellow'))