const { readCSV } = require('./io')
const compose = require('./compose')
const Logger = require('./components/logger')
const Serializable = require('./components/serializable')
const States = require('./components/state')
const TimeStep = require('./components/time-step')
const Transition = require('./components/transition')
const extractLinks = require('./network/extract-links')


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
    config: {},
    graph: {}
  })

  api.load = async path => {
    _.log.i(`Loading network from: ${path}`)

    // Load and map data.
    let data = await readCSV(path).catch(_.log.e)
    data = data.map(d => ({
      ts: +d['ts'],
      n1: +d['n1'],
      n2: +d['n2']
    }))
    _.log.i(`  number of links: ${data.length}`)

    // Extract nodes.
    _.graph.nodes = [...new Set(data.map(d => [d.n1, d.n2]).flat())]
      .sort((a, b) => a - b)
    _.log.i(`  number of nodes: ${_.graph.nodes.length}`)

    // Extract links.
    _.graph.links = extractLinks(data)
    _.log.i(`  number of bins:  ${_.graph.links.size}`)

    return api
  }

  return api
}
