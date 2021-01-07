const Boom = require('@hapi/boom');

function notFoundHandler(req, res) {
    const {
        output: { statusCode, payload }
    } = Boom.notFound();

    res.status(statusCode).json(payload)
}

module.exports = notFoundHandler;