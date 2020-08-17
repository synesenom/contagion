/**
 * Component implementing serialization functionalities.
 *
 * @function Serializable
 * @param {Object} _ Private members of the parent mixin.
 * @param {Object} api Public API of the parent mixin.
 * @return {Object} Object containing the private members and the public API of the parent mixin.
 */
module.exports = (_, api) => {
  // Assign methods to public API.
  api = Object.assign(api || {}, {
    /**
     * Returns a simulation as a serialized string.
     *
     * @method serialize
     * @methodOf Serializable
     * @return {string} The current simulation serialized to a string.
     * @example
     *
     * const net = network()
     * net.serialize()
     * // => '{"simulation":{"dt":1,"k":1,"states":{},"transitions":[]}}'
     */
    serialize () {
      const { simulation } = _
      return JSON.stringify({
        simulation
      })
    },

    /**
     * De-serializes a previously serialized simulation.
     *
     * @method deserialize
     * @methodOf Serializable
     * @param {string} dump String representation of the current simulation.
     * @return {Object} Reference to the simulation's API.
     */
    deserialize (dump) {
      const { simulation } = JSON.parse(dump)
      _.simulation = simulation
      return api
    }
  })

  // Return private members and public API.
  return { _, api }
}
