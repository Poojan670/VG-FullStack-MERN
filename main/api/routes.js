const express = require('express'),
    error = require('../../middleware/error'),
    helmet = require('helmet'),
    home = require('../../src/routes/home'),
    users = require('../../src/routes/users'),
    dev = require('../../src/routes/developer'),
    category = require('../../src/routes/category'),
    games = require('../../src/routes/games')


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(error);
    app.use(helmet());

    app.use('/', home)
    app.use('/api/devs', dev)
    app.use('/api/categories', category)
    app.use('/api/games', games)
    app.use('/api/users', users)

    app.set('view engine', 'pug');
    app.set('views', './src/views')
}