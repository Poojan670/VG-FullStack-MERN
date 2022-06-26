const express = require('express');
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
