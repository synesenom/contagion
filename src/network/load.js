const { readCSV } = require('../io')

module.exports = async path => {
  let data = await readCSV(path)
  return data.map(d => ({
    ts: +d['ts'],
    n1: +d['n1'],
    n2: +d['n2']
  }))
}
