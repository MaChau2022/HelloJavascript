const list = ["Alice", "Bob", "Cassandra"];
const iterator = list[Symbol.iterator]();

describe('Iterator', function() {
    it('Array', function() {
        const list = ["Alice", "Bob", "Cassandra"];
        const iterator = list[Symbol.iterator]();
        expect(iterator.next()).to.be.deep.equal({value: "Alice", done: false})
        expect(iterator.next()).to.be.deep.equal({value: "Bob", done: false})
        expect(iterator.next()).to.be.deep.equal({value: "Cassandra", done: false})
        expect(iterator.next()).to.be.deep.equal({value: undefined, done: true})
    })
})


/** customize iterator demo */
function MyIterable() {
    this.list = ["Alice", "Bob", "Cassandra"];
    this.index = 0;
    this[Symbol.iterator] = function* () {
        while(this.list[this.index]) {
            yield this.list[this.index++];
        }
    }
}
const iterable = new MyIterable();
for (const item of iterable) {
    console.log({
        value: item
    });
}
