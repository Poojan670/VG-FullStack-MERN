const express = require('express'),
    morgan = require('morgan'),
    error = require('../../middleware/error'),
    helmet = require('helmet'),
    home = require('../../src/routes/home'),
    users = require('../../src/routes/users'),
    userDetails = require('../../src/routes/userDetails'),
    dev = require('../../src/routes/developer'),
    category = require('../../src/routes/category'),
    games = require('../../src/routes/games')


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(error);
    app.use(helmet());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    app.use('/public', express.static("public"));

    app.use('/', home)
    app.use('/api/devs', dev)
    app.use('/api/users', users)
    app.use('/api/user-details', userDetails)
    app.use('/api/categories', category)
    app.use('/api/games', games)

    app.set('view engine', 'pug');
    app.set('views', './src/views')


}