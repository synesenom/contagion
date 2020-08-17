const { assert } = require('chai')
const { describe, it } = require('mocha')
const stdout = require('test-console').stdout
const network = require('../src/network')


describe('network', () => {
  describe('.deserialize', () => {
    it('should parse serialized dump correctly', () => {
      const dump = '{"simulation":{"dt":123,"k":10,"states":{"a":"foo"},"transitions":[{"b":"bar"}]}}'
      assert.deepEqual(network().deserialize(dump).serialize(), dump)
    })
  })

  describe('.dt', () => {
    it('should update the time resolution', () => {
      assert.deepEqual(
        network().dt(123).serialize(),
        '{"simulation":{"dt":123,"k":1,"states":{},"transitions":[]}}'
      )
    })
  })

  describe('.serialize', () => {
    it('should return the uninitialized state of the network', () => {
      assert.deepEqual(network().serialize(), '{"simulation":{"dt":1,"k":1,"states":{},"transitions":[]}}')
    })
  })

  describe('.state', () => {
    it('should add states to the simulation states', () => {
      assert.deepEqual(
        network().state('a').state('b').state('c').serialize(),
        '{"simulation":{"dt":1,"k":1,"states":{"a":2,"b":3,"c":5},"transitions":[]}}'
      )
    })
  })

  describe('.transition', () => {
    it('should add transitions to the simulation transitions', () => {
      assert.deepEqual(
        network()
          .transition('infection', [['s', 'i'], ['i', 'i']], 0.1)
          .transition('recovery', [['i'], ['r']], 2, (p, dt) => dt / p)
          .serialize(),
      '{"simulation":{"dt":1,"k":1,"states":{},"transitions":[{"name":"infection","before":["s","i"],"after":["i","i"],"p":0.1},{"name":"recovery","before":["i"],"after":["r"],"p":0.5}]}}'
      )
    })
  })
})
