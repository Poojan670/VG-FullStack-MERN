const express = require('express');
require('express-async-errors');
const router = express.Router();
const auth = require('../../middleware/auth')
const upload = require('../utils/storage')
const { listGames, createGames, getGame,
    updateGame, deleteGame,
    BuyGame } = require('../controllers/games')

router.get('/', listGames);
router.post('/', [upload.single('image'), upload.array('images')], createGames);
router.get('/:id', getGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

router.patch('/:id', auth, BuyGame);


module.exports = router;