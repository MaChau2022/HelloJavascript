const { swap, random } = require('./util')

module.exports = function bubbleSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i += 1) {
        let j = 0;
        while(j < len - 1 - i) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
            j += 1
        }
    }

    return arr;
}

