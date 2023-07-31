const { swap } = require("./util");

module.exports = function quickSort(arr, from, to) {
    if (from >= to) return arr;

    let i = from;
    let j = to;
    let cur = arr[from];

    while (true) {
        while (arr[j] >= cur && i < j) j -= 1;
        while (arr[i] <= cur && i < j) i += 1;
        
        if (i < j) {
            swap(arr, i, j);
        }
        else break;
    }
    
    swap(arr, from, i);
    quickSort(arr, from, i - 1);
    quickSort(arr, i + 1, to);

    return arr;
}