const express = require('express');
const router = express.Router();
const {
    listGameCategories,
    createGameCategory,
    getGameCategory,
    updateGameCategory,
    deleteGameCategory
} = require('../controllers/category')

router.get('/', listGameCategories);
router.post('/', createGameCategory);
router.get('/:id', getGameCategory);
router.put('/:id', updateGameCategory);
router.delete('/:id', deleteGameCategory);


module.exports = router;