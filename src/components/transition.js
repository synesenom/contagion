/**
 * todo
 * @param _
 * @param api
 * @return {{api: *, _: *}|*}
 */
module.exports = (_, api) => {
  // Add private members.
  _.config = Object.assign(_.config, {
    transitions: []
  })

  api = Object.assign(api, {
    /**
     * Adds a transition to the config.
     *
     * @method transition
     * @methodOf Transition
     * @param {string} name Name of the transition.
     * @param {Array[]} states Array containing two arrays with the states of the nodes before and after the transition.
     * @param {number} rate Generalized rate of the transition. This can be a physical rate, time period or any number
     * that parametrizes the transition.
     * @param {Function} [scale = x => x] Scaling function to apply in order to convert the physical parameter to the
     * config rate parameter. May take three parameters: the transmission's physical parameter, the config time
     * step size in days and the temporal average degree (twice the total number of temporal links divided by the number
     * of nodes and number of time bins) and must return the config rate parameter.
     * @return {Object} Reference to the mixin's API.
     */
    transition (name, states, rate, scale = d => d) {
      _.config.transitions.push({
        name,
        before: states[0],
        after: states[1],
        p: scale(rate, _.config.dt, _.config.k)
      })
      return api
    }
  })

  return {_, api}
}
