const chalk = require('chalk')

/**
 * Component implementing logging functionality.
 *
 * @function Logger
 */
module.exports = (_, api) => {
  // Component private members.
  const start = Date.now()

  // Component private methods.
  /**
   * Extends a number to be a two digit one.
   *
   * @method padded
   * @methodOf Logger
   * @param {number} x Number to format.
   * @return {string} The padded string representing the number.
   * @private
   * @example
   *
   * padded(3)
   * // => '03'
   *
   * padded(12)
   * // => '12'
   */
  function padded (x) {
    return `${Math.floor(x / 10)}${x % 10}`
  }

  /**
   * Formats elapsed time from the beginning.
   *
   * @method formatElapsedTime
   * @methodOf Logger
   * @param {number} ms Time elapsed from the time the module was imported in milliseconds.
   * @return {string} The elapsed time in HH:mm:SS format.
   * @private
   * @example
   *
   * formatElapsedTime(12000)
   * // => '00:00:12'
   *
   * formatElapsedTime(1234567)
   * // => '03:25:45'
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
   * @methodOf Logger
   * @param {string} type Message type.
   * @param {(chalk.Chalk|Function)} color Coloring function (using chalk).
   * @param {string} msg Message to show.
   * @private
   * @example
   *
   * message('INFO', chalk.white, 'A message')
   * // => '\u001b[37mINFO [00:00:00]: A message\u001b[39m\n'
   */
  function log(type, color, msg) {
    console.log(color(`${type} [${formatElapsedTime(Date.now() - start)}]: ${msg}`))
  }

  // Assign private members.
  _ = Object.assign(_ || {}, {
    log: {
      /**
       * Prints an error message.
       *
       * @method e
       * @methodOf Logger
       * @param {string} msg Message content.
       * @example
       *
       * log.e('Awful error')
       * // => '\u001b[31mERRO [00:01:23]: Awful error\u001b[39m\n'
       */
      e: msg => log('ERRO', chalk.red, msg),

      /**
       * Prints an info message.
       *
       * @method i
       * @methodOf Logger
       * @param {string} msg Message content.
       * @example
       *
       * log.i('Success!')
       * // => '\u001b[37mINFO [08:32:11]: Success!\u001b[39m\n'
       */
      i: msg => log('INFO', chalk.white, msg)
    }
  })

  // Do nothing with public API, just add empty object if undefined.
  api = api || {}

  // Return private members and public API.
  return { _, api }
}
