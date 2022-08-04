const { Router } = require('express');
const router = Router();

const { renderIndex,createGame, renderGame, winnerGame } = require('../controllers/index.controller')

router.get('/', renderIndex);

router.get('/game', createGame);

router.get('/game/start', renderGame);

router.get('/game/winner', winnerGame);


module.exports = router;

