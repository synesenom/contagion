/**
 * Component implementing various states (compartments) for a simulation.
 *
 * @function States
 */
module.exports = (_, api) => {
  // State IDs.
  const IDS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

  // Add private members.
  _.config = Object.assign(_.config, {
    states: {}
  })

  // Add public methods.
  api = Object.assign(api, {
    /**
     * Adds a state (a compartment) to the mixin.
     *
     * @method state
     * @methodOf States
     * @param {string} name Name of the state to add.
     * @return {Object} Reference to the mixin's API.
     * @example
     *
     * // Add states 'S', 'I' and 'R' to a network simulation.
     * const net = network().state('S')
     *               .state('I')
     *               .state('R')
     */
    state (name) {
      _.config.states[name] = IDS[Object.keys(_.config.states).length]
      return api
    }
  })

  return { _, api }
}
