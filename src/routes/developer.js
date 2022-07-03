const express = require('express');
require('express-async-errors');
const router = express.Router();
const auth = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/roles')
const {
    list,
    create,
    get,
    put,
    del
} = require('../controllers/developer')

router.get('/', list);
router.post('/', auth, create);
router.get('/:id', get);
router.put('/:id', put);
router.delete('/:id', [auth, isAdmin], del);

module.exports = router;
