const express = require('express');
const router = express.Router();
const { listGames, createGames, getGame, updateGame, deleteGame } = require('../controllers/games')

router.get('/', listGames);
router.post('/', createGames);
router.get('/:id', getGame);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);


module.exports = router;