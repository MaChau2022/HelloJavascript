function swap(arr, j, i) {
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}


function random(length, max, min) {
    min = min || 0;
    return new Array(length).fill(0).map(() => (
        Math.floor(Math.random() * (max - min) + min)
    ))
}

module.exports = {
    swap,
    random
}