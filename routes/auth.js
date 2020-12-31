// Modules
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

//Validations
const validationHandler = require('../utils/middleware/validationHandler');

//Api Services
const UsersService = require('../services/users');

//Console Messages
const { consoleSuccess } = require('../utils/messages/console/consoleFunctions');

//Schemas
const {
    createUserSchema,
    createProviderUserSchema
} = require('../utils/schemas/users')

// Config 
const { config } = require('../config/index');

function authApi(app) {

    //Config the router
    const router = express.Router();
    app.use('/api/auth', router);

    //Initial instance for the services 
    const usersService = new UsersService();

    //ROUTES -
    router.post('/sign-in', async(req, res, next) => {
        const { apiKeyToken } = req.body;

        if (!apiKeyToken) {
            next(boom.unauthorized('apiKeyToken is required'));
        } else {
            console.log('success token recibed');
            res.send('Correct');
        }


    });

    router.post('/sign-up',
        validationHandler(createUserSchema), async(
            req,
            res,
            next
        ) => {
            const { body: user } = req;

            try {
                const createdUserId = await usersService.createUser({ user })

                consoleSuccess("Auth - sign-up", "User created", Date.now())

                res.status(201).json({
                    data: createdUserId,
                    message: 'user created'
                });
            } catch (error) {
                next(error)
            }
        })
}

module.exports = authApi;