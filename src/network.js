/**
 * Module implementing a temporal network based compartment model.
 *
 * @module network
 */
module.exports = () => {
  // State IDs.
  const IDS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

  // Private members.
  let _ = {
    simulation: {
      dt: 1,
      k: 1,
      states: {},
      transitions: []
    }
  }

  // Public API.
  let api = {}

  /**
   * Sets the physical time resolution in days.
   *
   * @method td
   * @methodOf network
   * @param {number} dt Time resolution to set.
   * @return {network} Reference to the network's API.
   * @example
   *
   * // Set time resolution to 1 hour
   * const net = network().dt(1 / 24)
   */
  api.dt = dt => {
    _.simulation.dt = dt
    return api
  }

  /**
   * Adds a state (a compartment) to the simulation.
   *
   * @method state
   * @methodOf network
   * @param {string} name Name of the state to add.
   * @return {network} Reference to the network's API.
   * @example
   *
   * // Add states 'S', 'I' and 'R'.
   * const net = network().state('S')
   *               .state('I')
   *               .state('R')
   */
  api.state = name => {
    _.simulation.states[name] = IDS[Object.keys(_.simulation.states).length]
    return api
  }

  /**
   * Adds a transition to the simulation.
   *
   * @method transition
   * @methodOf network
   * @param {string} name Name of the transition.
   * @param {Array[]} states Array containing two arrays with the states of the nodes before and after the transition.
   * @param {number} rate Generalized rate of the transition. This can be a physical rate, time period or any number
   * that parametrizes the transition.
   * @param {Function} [scale = x => x] Scaling function to apply in order to convert the physical parameter to the
   * simulation rate parameter. May take three parameters: the transmission's physical parameter, the simulation time
   * step size in days and the temporal average degree (twice the total number of temporal links divided by the number
   * of nodes and number of time bins) and must return the simulation rate parameter.
   * @return {network} Reference to the network's API.
   */
  api.transition = (name, states, rate, scale = d => d) => {
    // Add transition.
    _.simulation.transitions.push({
      name,
      before: states[0],
      after: states[1],
      p: scale(rate, _.simulation.dt, _.simulation.k)
    })
    return api
  }

  /**
   * Returns the network simulation as a serialized string.
   *
   * @method serialize
   * @methodOf network
   * @return {string} The network simulation serialized to a string.
   * @example
   *
   * const net = network()
   * net.serialize()
   * // => '{"simulation":{"dt":1,"k":1,"states":{},"transitions":[]}}'
   */
  api.serialize = () => {
    const { simulation } = _
    return JSON.stringify({
      simulation
    })
  }

  /**
   * De-serializes a previously serialized network simulation.
   *
   * @method deserialize
   * @methodOf network
   * @param {string} dump String representation of the network simulation.
   * @return {network} Reference to the network's API.
   */
  api.deserialize = dump => {
    const { simulation } = JSON.parse(dump)
    _.simulation = simulation
    return api
  }

  return api
}
