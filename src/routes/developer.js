const express = require('express');
require('express-async-errors');
const router = express.Router();
const {
    list,
    create,
    get,
    put,
    del
} = require('../controllers/developer')

router.get('/', list);
router.post('/', create);
router.get('/:id', get);
router.put('/:id', put);
router.delete('/:id', del);

module.exports = router;
