module.exports = data => {
  return [...new Set(data.map(d => [d.n1, d.n2]).flat())]
    .sort((a, b) => a - b)
}
