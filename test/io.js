const { assert } = require('chai')
const { describe, it } = require('mocha')
const stdin = require('mock-stdin').stdin();
const io = require('../src/io')


describe('io', () => {
  describe('.readCSV', () => {
    it('should read CSV file', () => {
      io.readCSV('./test/data/io.read-csv.csv')
        .then(data => {
          assert.deepEqual(data[0], {a: '1', b: 'foo', c: '2.1'})
          assert.deepEqual(data[1], {a: '2', b: 'bar', c: '3.2'})
          assert.deepEqual(data['columns'], ['a', 'b', 'c'])
        })
    })

    it('should throw an error if file does not exist', async () => {
      const data = await io.readCSV('./test/data/fake.csv')
        .catch(e => assert(e === `ENOENT: no such file or directory, open './test/data/fake.csv'`))
      assert(typeof data === 'undefined')
    })

    it('should read data from stdin', async () => {
      io.readCSV(null).then(data => {
        assert.deepEqual(data[0], {a: 'foo', b: '1'})
        assert.deepEqual(data[1], {a: 'bar', b: '2'})
        assert.deepEqual(data['columns'], ['a', 'b'])
      })
      stdin.send(['a,b', 'foo,1', 'bar,2'])
      stdin.end()
    })
  })
})
