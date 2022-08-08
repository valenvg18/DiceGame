const { Router } = require('express');
const router = Router();

const { renderIndex,createGame, renderGame, winnerGame,renderGames } = require('../controllers/index.controller')

router.get('/', renderIndex);

module.exports = router;

