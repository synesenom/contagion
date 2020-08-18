const { assert } = require('chai')
const { describe, it } = require('mocha')
const compose = require('../../src/compose')
const Serializable = require('../../src/components/serializable')


// Dummy mixin for testing purposes.
const SerializableTest = () => {
  const {_, api} = compose([Serializable], {
    config: {
      a: 'foo',
      b: 2
    }
  })

  return api
}

describe('Serializable', () => {
  describe('.deserialize', () => {
    it('should parse serialized dump correctly', () => {
      const dump = '{"a":"bar","b":3}'
      assert.equal(SerializableTest().deserialize(dump).serialize(), dump)
    })
  })

  describe('.serialize', () => {
    it('should return the mixin config as a string', () => {
      assert.equal(SerializableTest().serialize(), '{"a":"foo","b":2}')
    })
  })
})