Function.prototype.myApply= function(context, ...args) {
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

const data = {
    [0]: 'Alice',
    [1]: 'Bob',
    [2]: 'Cassandra',
    [3]: 'Dove',
    length: 3,
}
Array.prototype.forEach.myApply(data, (value) => console.log(value))