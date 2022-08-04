const { Router } = require('express');
const router = Router();

const { 
    renderGameForm, 
    createGame, 
    renderStartGame, 
    startGame , 
    renderEditGame, 
    updateGame, 
    winnerGame 
} = require('../controllers/game.controller');


//Crear juego
router.get('/game', renderGameForm);
router.post('/createGame', createGame);


//Comenzar juego
router.get('/game/startGame', renderStartGame);
router.get('/game/startGame', startGame);


//Editar Juego, get solo muestra, post actualiza los datos
router.get('/game/edit/:id', renderEditGame);
router.post('/game/edit/:id', updateGame);


//Query para determinar el ganador del juego (una vista con el ganador)
router.get('/game/:id/winner', winnerGame);



//Query para consultar el juego y su estado (listado de jugadores y estados como tal del juego)
router.get('/game/:id')

module.exports = router;
