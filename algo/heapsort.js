const { swap } = require("./util");

module.exports = function heapSort(arr) {
    const len = arr.length;
    for (let i = Math.floor(len / 2) - 1; i >= 0; i -= 1) {
        heapCheck(arr, i, len);
    }
    for (let i = 0; i < len - 1; i += 1) {
        swap(arr, 0, len - 1 - i);
        heapCheck(arr, 0, len - 1 - i)
    }
    return arr;
}

function heapCheck(arr, i, len) {
    let p = i;
    let j = 2 * p + 1;
    while(j < len) {
        if (j + 1 < len && arr[j + 1] > arr[j]) j += 1;
        if (arr[p] < arr[j]) {
            swap(arr, p, j);
            p = j;
            j = 2 * p + 1;
        } else break;
    }
}