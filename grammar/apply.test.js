Function.prototype.myApply= function(context, ...args) {
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn
    return result
}

const expect = require('chai').expect

describe('Apply', function() {
    it('Customize apply', function() {
        const data = {
            [0]: 'Alice',
            [1]: 'Bob',
            [2]: 'Cassandra',
            [3]: 'Dove',
            length: 3,
        }
        const result = Array.prototype.slice.myApply(data, [0, 2])
        expect(result).to.deep.equal(['Alice', 'Bob'])
    })
})

