const { nest } = require('d3-collection')

module.exports = data => new Map(nest()
  .key(d => d.ts)
  .entries(data)
  .map(d => [
    +d.key,
    d.values.map(v => ({
      n1: Math.min(v.n1, v.n2),
      n2: Math.max(v.n1, v.n2)
    }))
  ]))
