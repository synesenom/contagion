const { assert } = require('chai')
const { describe, it } = require('mocha')
const stdin = require('mock-stdin').stdin();
const stdout = require('test-console').stdout
const io = require('../src/io')
const { existsSync, readFileSync, unlinkSync } = require('fs')


describe('io', () => {
  describe('.readCSV', () => {
    it('should read a CSV file', () => {
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

  describe('.writeCSV', () => {
    const path = './test/data/io.write-csv.csv'

    it('should write a CSV file', async () => {
      if (existsSync(path)) unlinkSync(path)
      await io.writeCSV([{a: 1, b: 'foo', c: 1.2}, {a: 2, b: 'bar', c: 2.3}], path)
      assert.deepEqual(readFileSync(path, {encoding: 'utf8'}), 'a,b,c\n1,foo,1.2\n2,bar,2.3\n')
    })

    it('should append data to a CSV file', async () => {
      if (existsSync(path)) unlinkSync(path)
      await io.writeCSV([{a: 1, b: 'foo', c: 1.2}], path)
      await io.writeCSV([{a: 2, b: 'bar', c: 2.3}], path, true)
      assert.deepEqual(readFileSync(path, {encoding: 'utf8'}), 'a,b,c\n1,foo,1.2\n2,bar,2.3\n')
    })

    it('should throw an error if data is empty', () => {
      io.writeCSV([], path)
        .catch(e => assert(e === 'Error: data is empty, nothing is written.'))
    })

    it('should write data to stdout', async () => {
      const write = stdout.inspectSync(() => {
        io.writeCSV([{a: 1, b: 'foo', c: 1.2}, {a: 2, b: 'bar', c: 2.3}])
      })
      assert.deepEqual(write, ['a,b,c\n1,foo,1.2\n2,bar,2.3\n'])
    })
  })
})
