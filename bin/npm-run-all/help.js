"use strict"

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

/**
 * Print a help text.
 *
 * @param {stream.Writable} output - A writable stream to print.
 * @returns {Promise} Always a fulfilled promise.
 * @private
 */
module.exports = function printHelp(output) {
    output.write(`
Usage:
    $ npx-run-all [--help | -h | --version | -v]
    $ npx-run-all [tasks] [OPTIONS]

    Run given npx-scripts in parallel or sequential.

    <tasks> : A list of npx-scripts' names and Glob-like patterns.

Options:
    --aggregate-output   - - - Avoid interleaving output by delaying printing of
                               each command's output until it has finished.
    -c, --continue-on-error  - Set the flag to continue executing
                               other/subsequent tasks even if a task threw an
                               error. 'npx-run-all' itself will exit with
                               non-zero code if one or more tasks threw error(s)
    --max-parallel <number>  - Set the maximum number of parallelism. Default is
                               unlimited.
    --npx-path <string>  - - - Set the path to npx. Default is the value of
                               environment variable npx_execpath.
                               If the variable is not defined, then it's "npx".
                               In this case, the "npx" command must be found in
                               environment variable PATH.
    -l, --print-label  - - - - Set the flag to print the task name as a prefix
                               on each line of output. Tools in tasks may stop
                               coloring their output if this option was given.
    -n, --print-name   - - - - Set the flag to print the task name before
                               running each task.
    -p, --parallel <tasks>   - Run a group of tasks in parallel.
                               e.g. 'npx-run-all -p foo bar' is similar to
                                    'npx run foo & npx run bar'.
    -r, --race   - - - - - - - Set the flag to kill all tasks when a task
                               finished with zero. This option is valid only
                               with 'parallel' option.
    -s, --sequential <tasks> - Run a group of tasks sequentially.
        --serial <tasks>       e.g. 'npx-run-all -s foo bar' is similar to
                                    'npx run foo && npx run bar'.
                               '--serial' is a synonym of '--sequential'.
    --silent   - - - - - - - - Set 'silent' to the log level of npx.

Examples:
    $ npx-run-all --serial clean lint build:**
    $ npx-run-all --parallel watch:**
    $ npx-run-all clean lint --parallel "build:** -- --watch"
    $ npx-run-all -l -p start-server start-browser start-electron

See Also:
    https://github.com/nxpkg/npx-run-all#readme
`)

    return Promise.resolve(null)
}
