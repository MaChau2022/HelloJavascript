function myInstanceof(left, right) {
    const prototype = right.prototype;
    while(left.__proto__ !== prototype) {
        left = left.__proto__;
        if (!left) return false;
    }
    return true;
}

console.log(myInstanceof(new Array(), Object))
console.log(myInstanceof(new Object(), Array))