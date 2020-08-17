const compose = require('./compose')
const Logger = require('./components/logger')
const Serializable = require('./components/serializable')


/**
 * Mixin implementing a temporal network based compartment model. Implements the following components: Serializable,
 * Logger.
 *
 * @function Network
 */
module.exports = () => {
  // State IDs.
  const IDS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

  // Private members.
  const { _, api } = compose({
    config: {
      dt: 1,
      k: 1,
      states: {},
      transitions: []
    }
  }, {},
    Logger,
    Serializable
  )

  /**
   * Sets the physical time resolution in days.
   *
   * @method td
   * @methodOf Network
   * @param {number} dt Time resolution to set.
   * @return {Network} Reference to the network's API.
   * @example
   *
   * // Set time resolution to 1 hour
   * const net = network().dt(1 / 24)
   */
  api.dt = dt => {
    _.config.dt = dt
    return api
  }

  /**
   * Adds a state (a compartment) to the config.
   *
   * @method state
   * @methodOf Network
   * @param {string} name Name of the state to add.
   * @return {Network} Reference to the network's API.
   * @example
   *
   * // Add states 'S', 'I' and 'R'.
   * const net = network().state('S')
   *               .state('I')
   *               .state('R')
   */
  api.state = name => {
    _.config.states[name] = IDS[Object.keys(_.config.states).length]
    return api
  }

  /**
   * Adds a transition to the config.
   *
   * @method transition
   * @methodOf Network
   * @param {string} name Name of the transition.
   * @param {Array[]} states Array containing two arrays with the states of the nodes before and after the transition.
   * @param {number} rate Generalized rate of the transition. This can be a physical rate, time period or any number
   * that parametrizes the transition.
   * @param {Function} [scale = x => x] Scaling function to apply in order to convert the physical parameter to the
   * config rate parameter. May take three parameters: the transmission's physical parameter, the config time
   * step size in days and the temporal average degree (twice the total number of temporal links divided by the number
   * of nodes and number of time bins) and must return the config rate parameter.
   * @return {Network} Reference to the network's API.
   */
  api.transition = (name, states, rate, scale = d => d) => {
    // Add transition.
    _.config.transitions.push({
      name,
      before: states[0],
      after: states[1],
      p: scale(rate, _.config.dt, _.config.k)
    })
    return api
  }

  return api
}
