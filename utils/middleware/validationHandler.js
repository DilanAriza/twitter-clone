const boom = require('@hapi/boom');
const joi = require('@hapi/joi');

//Console Messages
const { consoleError } = require('../messages/console/consoleFunctions');

function validate(data, schema) {
    const schemaValid = joi.object(schema);
    const { error } = schemaValid.validate(data);

    error && consoleError("Validation Handler - Valid data", error.message, Date.now());

    return error
}

function validationHandler(schema, check = 'body') {
    return function(req, res, next) {
        const error = validate(req[check], schema);

        error ? next(boom.badRequest(error)) : next();
    };
}

module.exports = validationHandler;