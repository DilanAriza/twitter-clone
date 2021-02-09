const auth = require('./auth');
const contentCreation = require('./contentCreation');
const userInformation = require('./userInformation');
const favoriteTweet = require('./favoriteTweet');

function addRoutes(app) {
    [
        auth,
        contentCreation,
        userInformation,
        favoriteTweet
    ].forEach(routes => routes(app));
}

module.exports = addRoutes;