function consoleError(from, error, time) {
    console.group("Console - error");
    console.log(`ERROR | ${from} | ${error} | ${time} | END`);
    console.groupEnd();
}

function consoleSuccess(from, message, time) {
    console.group("Console - success");
    console.log(`SUCCESS | ${from} | ${message} | ${time} | END`);
    console.groupEnd();
}

module.exports = {
    consoleError,
    consoleSuccess
};