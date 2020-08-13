const chalk = require('chalk')

module.exports = (() => {
  const _ = {
    start: Date.now()
  }

  function padded (x) {
    return `${Math.floor(x / 10)}${x % 10}`
  }

  function formatElapsedTime (ms) {
    ms = Math.floor(ms / 1000)
    const h = Math.floor(ms / 3600)
    const m = Math.floor((ms % 3600) / 60)
    const s = ms % 60
    return `${padded(h)}:${padded(m)}:${padded(s)}`
  }

  return {
    e: message => console.log(chalk.red(`ERRO [${formatElapsedTime(Date.now() - _.start)}]: ${message}`)),
    i: message => console.log(chalk.white(`INFO [${formatElapsedTime(Date.now() - _.start)}]: ${message}`))
  }
})()
