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

  function log(type, color, msg) {
    console.log(color(`${type} [${formatElapsedTime(Date.now() - _.start)}]: ${msg}`))
  }

  return {
    e: message => log('ERRO', chalk.red, message),
    i: message => log('INFO', chalk.white, message)
  }
})()
