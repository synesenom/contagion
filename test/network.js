const { assert } = require('chai')
const { describe, it } = require('mocha')
const Network = require('../src/network')


describe('network', () => {
  describe('.deserialize', () => {
    it('should parse serialized dump correctly', () => {
      const dump = '{"dt":123,"k":10,"transitions":[{"b":"bar"}],"states":{"a":"foo"}}'
      assert.equal(Network().deserialize(dump).serialize(), dump)
    })
  })

  describe('.dt', () => {
    it('should update the time resolution', () => {
      assert.equal(
        Network().dt(123).serialize(),
        '{"dt":123,"k":1,"transitions":[],"states":{}}'
      )
    })
  })

  describe('.state', () => {
    it('should add states to the config states', () => {
      assert.equal(
        Network().state('a').state('b').state('c').serialize(),
        '{"dt":1,"k":1,"transitions":[],"states":{"a":2,"b":3,"c":5}}'
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
      '{"dt":1,"k":1,"transitions":[{"name":"infection","before":["s","i"],"after":["i","i"],"p":0.1},{"name":"recovery","before":["i"],"after":["r"],"p":0.5}],"states":{}}'
      )
    })
  })

  describe('.serialize', () => {
    it('should dump the network config as a string', () => {
      assert.deepEqual(Network().serialize(), '{"dt":1,"k":1,"transitions":[],"states":{}}')
    })
  })
})
