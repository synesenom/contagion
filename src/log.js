const chalk = require('chalk')

/**
 * Module managing log messages.
 *
 * @module log
 */
module.exports = (() => {
  // Private members.
  const _ = {
    // Start timestamp.
    start: Date.now()
  }

  /**
   * Extends a number to be a two digit one.
   *
   * @method padded
   * @methodOf log
   * @param {number} x Number to format.
   * @return {string} The padded string representing the number.
   * @private
   */
  function padded (x) {
    return `${Math.floor(x / 10)}${x % 10}`
  }

  /**
   * Formats elapsed time from the beginning.
   *
   * @method formatElapsedTime
   * @methodOf log
   * @param {number} ms Time elapsed from the time the module was imported in milliseconds.
   * @return {string} The elapsed time in HH:mm:SS format.
   * @private
   */
  function formatElapsedTime (ms) {
    ms = Math.floor(ms / 1000)
    const h = Math.floor(ms / 3600)
    const m = Math.floor((ms % 3600) / 60)
    const s = ms % 60
    return `${padded(h)}:${padded(m)}:${padded(s)}`
  }

  /**
   * Prints a log message.
   *
   * @method log
   * @methodOf log
   * @param {string} type Message type.
   * @param {chalk.Chalk} color Coloring function (using chalk).
   * @param {string} msg Message to show.
   * @private
   */
  function message(type, color, msg) {
    console.log(color(`${type} [${formatElapsedTime(Date.now() - _.start)}]: ${msg}`))
  }

  // Public API.
  return {
    /**
     * Prints an error message.
     *
     * @method e
     * @methodOf log
     * @param {string} msg Message content.
     */
    e: msg => message('ERRO', chalk.red, msg),

    /**
     * Prints an info message.
     *
     * @method i
     * @methodOf log
     * @param {string} msg Message content.
     */
    i: msg => message('INFO', chalk.white, msg)
  }
})()
