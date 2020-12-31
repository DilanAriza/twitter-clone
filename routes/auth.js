// Modules
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//Validations
const validationHandler = require('../utils/middleware/validationHandler');

//Api Services


//Schemas
const {
    createUserSchema,
    createProviderUserSchema
} = require('../utils/schemas/users')

// Config 
const { config } = require('../config/index');

function authApi(app) {

    const router = express.Router();
    app.use('/api/auth', router);

    router.post('/sign-in', async(req, res, next) => {
        const { apiKeyToken } = req.body;

        if (!apiKeyToken) {
            next(boom.unauthorized('apiKeyToken is required'));
        } else {
            console.log('success token recibed');
            res.send('Correct');
        }


    });

    router.post('/sign-up', validationHandler(createUserSchema), async(req, res, next) => {
        const { body: user } = req;

        try {
            console.log(user);
            res.send('Correct');
        } catch (error) {
            next(error)
        }
    })
}

module.exports = authApi;