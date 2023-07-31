const { expect } = require('chai')
const bubbleSort = require('./bubble')
const selectSort = require('./select')
const insertSort = require('./insert')
const { random } = require('./util')
const quicksort = require('./quicksort')
const heapsort = require('./heapsort')

describe('Sort', function() {
    const arr = random(20, 100, 1)
    const sorted = [...arr].sort((a, b) => a - b)
    console.log(arr)

    it('Bubble sort', function() {
        const result = bubbleSort([...arr])
        expect(result).to.be.deep.equal(sorted)
    })

    it('Insert sort', function() {
        const result = insertSort([...arr])
        expect(result).to.be.deep.equal(sorted)
    })

    it('Select sort', function() {
        const result = selectSort([...arr])
        expect(result).to.be.deep.equal(sorted)
    })

    it('Quick sort', function() {
        const result = quicksort([...arr], 0, arr.length - 1)
        expect(result).to.be.deep.equal(sorted)
    })

    it.only('Heap sort', function() {
        const result = heapsort([...arr])
        expect(result).to.be.deep.equal(sorted)
    })
})
