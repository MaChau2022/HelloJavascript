const fs = require('fs')
const fsPromise = require('fs/promises')
const { describe } = require('mocha')
const path = require('path')
const { expect } = require('chai')

const dir = path.resolve(__dirname, 'assets')
const test = path.resolve(dir, 'test.txt')
const echo = path.resolve(dir, 'echo.txt')
const dist = path.resolve(dir, 'dist.txt')
const content = 'Hello World!'

String.prototype.repeat = function(n) {
    return new Array(n).fill(this).join('\n')
}

describe('File system', async function() {
    it('Create', async function() {
        await fsPromise.writeFile(test, content)
        const data = await fsPromise.readFile(test)
        expect(data.toString()).to.be.equal(content)
    })

    /** 
     * CHMOD
     * read = 4
     * write = 2
     * execute = 1
    */
    // it('Chmod', async function() {
    //     await fsPromise.chmod(test, 0o333)
    //     const data = await fsPromise.readFile(test)
    // })
    
    it('Close', async function() {
        const reader = fs.createReadStream(test)
        const writer = fs.createWriteStream(dist)
        reader.on('data', (chunk) => console.log('  Receive chunk:', chunk.length))
        reader.on('end', () => console.log('  Readable Stream finished'))
        writer.on('finish', () => console.log('  Writeable Stream finished'))
        reader.pipe(writer)
        writer.on('close', () => {
            console.log('  Writeable Stream closed')
            const data = fs.readFileSync(dist)
            expect(data.toString()).to.be.equal(content)
        })
    })

    it('Stat', async function() {
        const stat = await fsPromise.stat(test)
        expect(stat.isFile()).to.be.true
    })

    it('Access', async function() {
        let flag = true;
        await fsPromise.access(echo)
            .catch(e => flag = false)
        expect(flag).to.be.false
    })

    it('Copy', async function() {
        await fsPromise.copyFile(test, echo);
        const data = await fsPromise.readFile(echo)
        expect(data.toString()).to.be.equal(content)
    })

    it('Append', async function() {
        await fsPromise.appendFile(test, '\n' + content)
        const data = await fsPromise.readFile(test)
        expect(data.toString()).to.be.equal(content.repeat(2))
    })
})


describe('File handler', async function() {
    it('Read', async function() {
        const fd = await fsPromise.open(test, 'r');
        const buffer = Buffer.alloc(5);
        /**
         * @param {Buffer} buffer
         * @param {number} offset of Buffer
         * @param {number} length of File
         * @param {number} position of File
         */
        await fd.read(buffer, 0, 5, 0);
        await fd.close();
        expect(buffer.toString()).to.be.equal(content.slice(0, 5))
    })  

    it('Write', async function() {
        const buffer = Buffer.from('\n' + content);
        const stat = await fsPromise.stat(dist);
        const fd = await fsPromise.open(dist, 'r+');
        /**
         * @param {Buffer} buffer
         * @param {number} offset of Buffer
         * @param {number} length of File
         * @param {number} position of File
         */
        await fd.write(buffer, 0, buffer.length, stat.size);
        await fd.close();
        /** CLOSE is nessary, otherwise UNLINK will fail */
        const data = await fsPromise.readFile(dist);
        expect(data.toString()).to.be.equal(content.repeat(2))
    })
    
    it('ReadLines', async function() {
        const fd = await fsPromise.open(test, 'r');
        const lines = await fd.readLines();
        /** Async Iterator */
        const iterator = lines[Symbol.asyncIterator]();
        const line = await iterator.next();
        expect(line.value).to.be.equal(content)
    })

    it('Unlink', async function() {
        await fsPromise.unlink(test)
        await fsPromise.unlink(dist)
        await fsPromise.unlink(echo)

        const children = await fsPromise.readdir(dir)
        console.log(children)
        expect(children).to.be.empty
    })
})


/** change buffer 3 of certain file */
// async function changeBuffer3(file, buffer) {
//     const fd = await fsPromise.open(file, 'r+');
//     await fd.write(buffer, 0, 1, 2);
//     await fd.close();
// }
// fs.writeFile('foo', 'abcdefg', () => {
//     changeBuffer3('foo', Buffer.from('x'))
//     fs.readFile('foo', (err, data) => {
//         console.log(data.toString())
//     })
// })