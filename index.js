/* eslint-disable no-console */
const app = require('express')();
const express = require('express');
const helmet = require('helmet');

//Config file
const { config } = require('./config/index.js');

//Routers
const authApi = require('./routes/auth');

//Config middlewares
app.use(express.json());
app.use(helmet());

// Routes in action
authApi(app);

// Start server
app.listen(config.port, function() {
    console.log(`Listening in http://localhost:${config.port}`);
})