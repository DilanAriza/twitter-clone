/* eslint-disable no-console */
const app = require('express')();
const express = require('express')

//Config file
const { config } = require('./config/index.js');

//Routers
const authApi = require('./routes/auth');

//Config middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes in action
authApi(app);

// Start server
app.listen(config.port, function() {
    console.log(`Listening in http://localhost:${config.port}`);
})