const { createReadStream } = require('fs')
const { csvParse } = require('d3-dsv')

/**
 * Module handling I/O operations.
 *
 * @module io
 */
module.exports = {
  /**
   * Reads a CSV file asynchronously.
   *
   * @method readCSV
   * @methodOf io
   * @param {(string|null)?} path Path to the CSV file to read.
   * @return {Promise<Object[]>} Promise with the array of objects representing the CSV content.
   * @async
   */
  readCSV: path => new Promise((resolve, reject) => {
    let data = ''
    const error = e => reject(e.message)
    const append = chunk => data += chunk
    const done = () => resolve(csvParse(data.toString()))
    const reader = typeof path === 'undefined' || path === null ? process.openStdin() : createReadStream(path)
    reader.on('data', append)
      .on('end', done)
      .on('error', error)
  })
}
