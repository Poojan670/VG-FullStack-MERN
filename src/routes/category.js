const express = require('express');
require('express-async-errors');
const router = express.Router();
const category = require('../controllers/category')

router.get('/', category.listGameCategories);
router.post('/', category.createGameCategory);
router.get('/:id', category.getGameCategory);
router.put('/:id', category.updateGameCategory);
router.delete('/:id', category.deleteGameCategory);


module.exports = router;