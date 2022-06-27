const swaggerJSDoc = require('swagger-jsdoc');
const { swaggerDefinition } = require('./swaggerConfig')
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require('swagger-ui-express');

module.exports = function (app) {
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}