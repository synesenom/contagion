const { assert } = require('chai')
const { describe, it } = require('mocha')
const compose = require('../../src/compose')
const Serializable = require('../../src/components/serializable')
const State = require('../../src/components/state')


// Dummy mixin for testing purposes.
const StateTest = () => {
  const {_, api} = compose([Serializable, State])

  return api
}

describe('State', () => {
  describe('.state', () => {
    it('should add multiple states', () => {
      assert.equal(StateTest().state('a').state('b').serialize(), '{"states":{"a":2,"b":3}}')
    })
  })
})