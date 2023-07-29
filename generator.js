function* useYield(id) {
    const list = ["Alice", "Bob", "Cassandra"];
    for (const item of list) {
        id = yield item;
        console.log({ value: item, id });
    }
}

const gen = useYield(0);

console.log(gen.next(1));
console.log(gen.next(2));
console.log(gen.next(3));
console.log(gen.next(4));
