/* eslint-disable no-console */
const app = require('express')();
const express = require('express');
const helmet = require('helmet');

//error implementations
const {
    logErrors,
    wrapErrors,
    errorHandler
} = require('./utils/middleware/errorHandlers');

//404
const notFoundHandler = require('./utils/middleware/notFoundHandler');

//Config file
const { config } = require('./config/index.js');

//Routers
const authApi = require('./routes/auth');
const userInformation = require('./routes/userInformation');
const contentCreation = require('./routes/contentCreation');

//Config middlewares
app.use(express.json());
app.use(helmet());

// Routes in action
authApi(app);
userInformation(app);
contentCreation(app)

//Errors
app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// Start server
app.listen(config.port, function() {
    console.log(`Listening in http://localhost:${config.port}`);
})