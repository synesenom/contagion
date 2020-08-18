const { assert } = require('chai')
const { describe, it } = require('mocha')
const stdout = require('test-console').stdout
const Network = require('../src/network')


describe('network', () => {
  describe('.deserialize', () => {
    it('should parse serialized dump correctly', () => {
      const dump = '{"states":{"a":"foo"},"dt":123,"transitions":[{"b":"bar"}]}'
      assert.equal(Network().deserialize(dump).serialize(), dump)
    })
  })

  describe('.dt', () => {
    it('should update the time resolution', () => {
      assert.equal(
        Network().dt(123).serialize(),
        '{"states":{},"dt":123,"transitions":[]}'
      )
    })
  })

  describe('.load', () => {
    it('should print out correct load messages', async () => {
      const path = './test/data/network.load.csv'
      const inspect = stdout.inspect();
      await Network().load(path)
      inspect.restore();
      assert.deepEqual(inspect.output, [
        `\u001b[37mINFO [00:00:00]: Loading network from: ${path}\u001b[39m\n`,
        `\u001b[37mINFO [00:00:00]:   number of links: 10\u001b[39m\n`,
        `\u001b[37mINFO [00:00:00]:   number of nodes: 4\u001b[39m\n`,
        `\u001b[37mINFO [00:00:00]:   number of bins:  5\u001b[39m\n`
      ]);
    })
  })

  describe('.serialize', () => {
    it('should dump the network config as a string', () => {
      assert.deepEqual(Network().serialize(), '{"states":{},"dt":1,"transitions":[]}')
    })
  })

  describe('.state', () => {
    it('should add states to the config states', () => {
      assert.equal(
        Network().state('a').state('b').state('c').serialize(),
        '{"states":{"a":2,"b":3,"c":5},"dt":1,"transitions":[]}'
      )
    })
  })

  describe('.transition', () => {
    it('should add transitions to the config transitions', () => {
      assert.equal(
        Network()
          .transition('infection', [['s', 'i'], ['i', 'i']], 0.1)
          .transition('recovery', [['i'], ['r']], 2, (p, dt) => dt / p)
          .serialize(),
        '{"states":{},"dt":1,"transitions":[{"name":"infection","before":["s","i"],"after":["i","i"],"p":0.1},{"name":"recovery","before":["i"],"after":["r"],"p":0.5}]}'
      )
    })
  })
})
