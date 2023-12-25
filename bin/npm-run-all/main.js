"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const runAll = require("../../lib")
const parseCLIArgs = require("../common/parse-cli-args")

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Parses arguments, then run specified npx-scripts.
 *
 * @param {string[]} args - Arguments to parse.
 * @param {stream.Writable} stdout - A writable stream to print logs.
 * @param {stream.Writable} stderr - A writable stream to print errors.
 * @returns {Promise} A promise which comes to be fulfilled when all npx-scripts are completed.
 * @private
 */
module.exports = function npxRunAll(args, stdout, stderr) {
    try {
        const stdin = process.stdin
        const argv = parseCLIArgs(args)

        const promise = argv.groups.reduce(
            (prev, group) => {
                if (group.patterns.length === 0) {
                    return prev
                }
                return prev.then(() => runAll(
                    group.patterns,
                    {
                        stdout,
                        stderr,
                        stdin,
                        parallel: group.parallel,
                        maxParallel: group.parallel ? argv.maxParallel : 1,
                        continueOnError: argv.continueOnError,
                        printLabel: argv.printLabel,
                        printName: argv.printName,
                        config: argv.config,
                        packageConfig: argv.packageConfig,
                        silent: argv.silent,
                        arguments: argv.rest,
                        race: group.parallel && argv.race,
                        npxPath: argv.npxPath,
                        aggregateOutput: group.parallel && argv.aggregateOutput,
                    }
                ))
            },
            Promise.resolve(null)
        )

        if (!argv.silent) {
            promise.catch(err => {
                //eslint-disable-next-line no-console
                console.error("ERROR:", err.message)
            })
        }

        return promise
    }
    catch (err) {
        //eslint-disable-next-line no-console
        console.error("ERROR:", err.message)

        return Promise.reject(err)
    }
}
