"use strict"

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Print a version text.
 *
 * @param {stream.Writable} output - A writable stream to print.
 * @returns {Promise} Always a fulfilled promise.
 * @private
 */
module.exports = function printVersion(output) {
    const version = require("../../package.json").version

    output.write(`v${version}\n`)

    return Promise.resolve(null)
}
