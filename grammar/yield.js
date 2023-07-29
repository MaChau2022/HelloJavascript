const list = ["Alice", "Bob", "Cassandra"];
const iterator = list[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log('')


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
