const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    error = require('../../middleware/error'),
    helmet = require('helmet'),
    home = require('../../src/routes/home'),
    users = require('../../src/routes/users'),
    userDetails = require('../../src/routes/userDetails'),
    dev = require('../../src/routes/developer'),
    category = require('../../src/routes/category'),
    games = require('../../src/routes/games'),
    wallet = require('../../src/routes/wallet')


module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(error);
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use('/public', express.static("public"));

    app.use('/api/v1', home)
    app.use('/api/v1/devs', dev)
    app.use('/api/v1/users', users)
    app.use('/api/v1/user-details', userDetails)
    app.use('/api/v1/categories', category)
    app.use('/api/v1/games', games)
    app.use('/api/v1/wallet', wallet)

    app.set('view engine', 'pug');
    app.set('views', './src/views')


}