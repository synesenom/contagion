/**
 * todo
 * @param _
 * @param api
 * @return {{api: *, _: *}|*}
 */
module.exports = (_, api) => {
  // Add private members.
  _.config = Object.assign(_.config, {
    dt: 1
  })

  api = Object.assign(api, {
    /**
     * Sets the physical time resolution in days.
     *
     * @method td
     * @methodOf TimeStep
     * @param {number} dt Time step size (time resolution) to set.
     * @return {Object} Reference to the mixin's API.
     * @example
     *
     * // Set time resolution to 1 hour
     * const net = network().dt(1 / 24)
     */
    dt (dt) {
      _.config.dt = dt
      return api
    }
  })

  return {_, api}
}
