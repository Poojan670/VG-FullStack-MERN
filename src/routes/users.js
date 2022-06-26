const express = require('express');
const router = express.Router();
const { register, listUsers } = require('../controllers/users')

router.post('/', register)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
*/
router.get('/', listUsers)

module.exports = router;