/**
 * Component implementing serialization functionalities. The parent mixin must have a config private property that is
 * subject to the serialization operations.
 *
 * @function Serializable
 * @param {Object?} _ Private members of the parent mixin.
 * @param {Object?} api Public API of the parent mixin.
 * @return {Object} Object containing the private members and the public API of the parent mixin.
 */
module.exports = (_, api) => {
  // Assign methods to public API.
  api = Object.assign(api, {
    /**
     * Returns a config as a serialized string.
     *
     * @method serialize
     * @methodOf Serializable
     * @return {string} The current config serialized to a string.
     * @example
     *
     * const net = network()
     * net.serialize()
     * // => '{"config":{"dt":1,"k":1,"states":{},"transitions":[]}}'
     */
    serialize () {
      const { config } = _
      return JSON.stringify(config)
    },

    /**
     * De-serializes a previously serialized config.
     *
     * @method deserialize
     * @methodOf Serializable
     * @param {string} dump String representation of the current config.
     * @return {Object} Reference to the mixin's API.
     */
    deserialize (dump) {
      _.config = JSON.parse(dump)
      return api
    }
  })

  // Return private members and public API.
  return { _, api }
}
