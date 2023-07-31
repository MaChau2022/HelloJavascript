const { swap, random } = require('./util')
const { expect } = require('chai')

function bubbleSort(arr) {
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

module.exports = bubbleSort;
describe('Bubble sort', () => {
    it('Bubble sort', function() {
        const arr = random(20, 100, 1)
        const sorted = [...arr].sort((a, b) => a - b)
        const result = bubbleSort(arr)
        expect(result).to.be.deep.equal(sorted)
    })
})