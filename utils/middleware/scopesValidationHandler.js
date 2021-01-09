const Boom = require('@hapi/boom');

function scopesValidationHandler(allowedScopes) {
    return function(req, res, next) {
        if (!req.user || (req.user && !req.user.scopes)) {
            next(Boom.unauthorized('Missing scopes'));
        }

        const hasAccess = allowedScopes
            .map(allowedScope => req.user.scopes.includes(allowedScope))
            .find(allowed => Boolean(allowed));

        if (hasAccess) {
            next();
        } else {
            next(Boom.unauthorized('Insufficient scopes'));
        }
    }
}

module.exports = scopesValidationHandler;