const compose = require('./compose')
const Logger = require('./components/logger')
const Serializable = require('./components/serializable')
const States = require('./components/state')
const TimeStep = require('./components/time-step')
const Transition = require('./components/transition')


/**
 * Mixin implementing a temporal network based compartment model. Implements the following components: Serializable,
 * Logger.
 *
 * @function Network
 */
module.exports = () => {
  // Private members.
  const { _, api } = compose([
    Logger,
    Serializable,
    States,
    TimeStep,
    Transition
  ], {
    config: {
      k: 1
    }
  })

  return api
}
