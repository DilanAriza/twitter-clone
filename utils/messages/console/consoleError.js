function consoleError(from, error, time) {
    console.group("Console - error");
    console.log(`ERROR | ${from} | ${error} | ${time} | END`);
    console.groupEnd();
}

module.exports = { consoleError };