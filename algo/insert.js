module.exports = function insertSort(arr) {
    const len = arr.length;

    for (let i = 0; i < len - 1; i += 1) {
        let j = i + 1;
        const tmp = arr[j];
        while (j > 0 && arr[j - 1] > tmp) {
            arr[j] = arr[j - 1]
            j -= 1;
        }
        arr[j] = tmp;
    }

    return arr;
}