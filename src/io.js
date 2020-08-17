const { createReadStream } = require('fs')
const { csvFormat, csvParse } = require('d3-dsv')
const { createObjectCsvWriter } = require('csv-writer')

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
   * @example
   *
   * // Read data from file.
   * const data = await io.readCSV('path/to/file.csv').catch(console.error)
   *
   * // Read data from stdin.
   * const data = await io.readCSV().catch(console.error)
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
  }),

  /**
   * Writes a CSV file asynchronously.
   *
   * @method writeCSV
   * @methodOf io
   * @param {Object[]} data Array of object representing the data to write.
   * @param {(string|null)?} path Path to the CSV file.
   * @param {boolean} [append = false] Whether to append the data to the file or overwrite it.
   * @return {Promise<void>} An empty promise.
   * @async
   * @example
   *
   * // Write data to file.
   * io.writeCSV([{a: 1, b: 'foo'}, {a: 2, b: 'bar'}], 'path/to/file.csv')
   *
   * // Append data to existing file.
   * io.writeCSV([{a: 1, b: 'foo'}, {a: 2, b: 'bar'}], 'path/to/file.csv', true)
   *
   * // Send data to stdout.
   * io.writeCSV([{a: 1, b: 'foo'}, {a: 2, b: 'bar'}])
   */
  writeCSV: (data, path, append = false) => new Promise((resolve, reject) => {
    if (data.length === 0) {
      return reject('Error: data is empty, nothing is written.')
    }

    if (typeof path === 'undefined' || path === null) {
      console.log(csvFormat(data))
      process.on('SIGPIPE', process.exit)
    } else {
      createObjectCsvWriter({
        path,
        header: Object.keys(data[0]).map(d => ({id: d, title: d})),
        append
      }).writeRecords(data)
        .then(resolve)
        .catch(reject)
    }
  })
}
