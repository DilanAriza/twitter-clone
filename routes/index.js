const auth = require('./auth');
const contentCreation = require('./contentCreation');
const userInformation = require('./userInformation');

function addRoutes(app) {
    [
        auth,
        contentCreation,
        userInformation
    ].forEach(routes => routes(app));
}

module.exports = addRoutes;