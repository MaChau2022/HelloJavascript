Array.prototype.flat = function() {
    const result = [];
    this.forEach(item => {
        if (Array.isArray(item)) {
            result.push(...item.flat())
        } else {
            result.push(item)
        }
    })
    return result;
}

/** use reduce */
Array.prototype.flat = function() {
    return [[], ...this].reduce((prev, next) => {
        if (next instanceof Array) {
            prev.push(...next.flat())
        } else {
            prev.push(next)
        }
        return prev;
    })
}

const arr = [1, 2, [3, 4, [5, 6, [7, 8]]]];
console.log(arr.flat())
