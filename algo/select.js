const { swap } = require("./util");

module.exports = function selectSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i += 1) {
        let j = i;
        let k = j;
        while (j < len) {
            if (arr[k] > arr[j]) k = j;
            j += 1;
        }
        swap(arr, i, k)
    }

    return arr;
}