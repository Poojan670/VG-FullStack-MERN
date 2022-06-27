const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { listGames, createGames, getGame,
    updateGame, deleteGame,
    BuyGame } = require('../controllers/games')

router.get('/', listGames);
router.post('/', createGames);
router.get('/:id', getGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

router.patch('/:id', auth, BuyGame);


module.exports = router;