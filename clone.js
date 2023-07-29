function deepClone(obj, mem) {
    if (!mem) mem = new WeakMap();
    
    const result = {};
    if (!mem.has(obj)) mem.set(obj, result);
    
    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'object') {
            if (mem.has(value)) result[key] = mem.get(value);
            else result[key] = deepClone(value, mem);
        } else {
            result[key] = value;
        }
    }

    return result
}

const iduck = {
    name: 'iduck',
    color: 'yellow',
    age: 15,
    friends: ['bear', 'sheep']
}
iduck.self = iduck;

const clone = deepClone(iduck);
console.log(clone === iduck)
console.log(clone.self === clone);