// Environment
const dotenv = require('dotenv').config();

//Debug
const debug = require('debug')('debug')

// Main packages use
const express = require('express'),
    helmet = require('helmet'),
    morgan = require('morgan'),
    app = express(),
    Joi = require('joi'),
    mongoose = require('mongoose')

// Mongo Db Connection Config
mongoose.connect('mongodb://localhost/vg_db')
    .then(() => debug('Connected to Mongodb..'))
    .catch(err => debug("Couldn't connect to MongoDb"))

// Config
const config = require('config')
if (!process.env.jwtPrivateKey) {
    console.error("FATAL ERROR: JwtPrivateKey is not defined!");
    process.exit(1);
}

// Custom Middleware
const logger = require('./middleware/logger')

//Routes
const home = require('./src/routes/home'),
    users = require('./src/routes/users'),
    dev = require('./src/routes/developer'),
    category = require('./src/routes/category'),
    games = require('./src/routes/games')

// users = require('.src/routes/user')

// App Use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);

// morgan enabled via .env file
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'));
    debug("Morgan enabled");
}

// Routers Usage
app.use('/', home)
app.use('/api/devs', dev)
app.use('/api/categories', category)
app.use('/api/games', games)
app.use('/api/users', users)

// App Set
app.set('view engine', 'pug');
app.set('views', './src/views') //default

// Swagger Settings
const swaggerJSDoc = require('swagger-jsdoc');
const {swaggerDefinition} = require('./swagger')
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// run server in assigned port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}, Please checkout : http://localhost:${port}/`));