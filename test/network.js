const { assert } = require('chai')
const { describe, it } = require('mocha')
const Network = require('../src/network')


describe('network', () => {
  describe('.deserialize', () => {
    it('should parse serialized dump correctly', () => {
      const dump = '{"k":10,"states":{"a":"foo"},"dt":123,"transitions":[{"b":"bar"}]}'
      assert.equal(Network().deserialize(dump).serialize(), dump)
    })
  })

  describe('.dt', () => {
    it('should update the time resolution', () => {
      assert.equal(
        Network().dt(123).serialize(),
        '{"k":1,"states":{},"dt":123,"transitions":[]}'
      )
    })
  })

  describe('.state', () => {
    it('should add states to the config states', () => {
      assert.equal(
        Network().state('a').state('b').state('c').serialize(),
        '{"k":1,"states":{"a":2,"b":3,"c":5},"dt":1,"transitions":[]}'
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
      '{"k":1,"states":{},"dt":1,"transitions":[{"name":"infection","before":["s","i"],"after":["i","i"],"p":0.1},{"name":"recovery","before":["i"],"after":["r"],"p":0.5}]}'
      )
    })
  })

  describe('.serialize', () => {
    it('should dump the network config as a string', () => {
      assert.deepEqual(Network().serialize(), '{"k":1,"states":{},"dt":1,"transitions":[]}')
    })
  })
})
