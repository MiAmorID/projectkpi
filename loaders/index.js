const expressLoader = require('./express');
const config = require('../config');
const mongoose = require("mongoose");
const axios = require("axios");

module.exports = async (expressApp) => {
    const mongoDBUrl = `mongodb://${config.mongodb.url}:${config.mongodb.port}/?retryWrites=true&w=majority`;
    require('express-group-routes');
    mongoose.connect(
        mongoDBUrl,
        {
            user: config.mongodb.user,
            pass: config.mongodb.pass,
            dbName : config.mongodb.collection,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    axios.defaults.baseURL = config.gitlab.baseurl;
    axios.defaults.headers.common['PRIVATE-TOKEN'] = config.gitlab.token;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    await expressLoader(expressApp);  
};