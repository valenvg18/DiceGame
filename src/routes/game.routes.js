const { Router } = require('express');
const router = Router();

const { 
    renderGameForm, 
    createGame, 
    renderStartGame, 
    startGame , 
    renderEditGame, 
    updateGame, 
    winnerGame,
    renderGames,
    deleteGame,
    renderDelete,
    getGameById
} = require('../controllers/game.controller');


//Crear juego
router.get('/game', renderGameForm);
router.post('/createGame', createGame);


//Comenzar juego
router.get('/game/startGame/:id', renderStartGame);
router.post('/game/startGame/:id', startGame);


//Editar Juego, get solo muestra, post actualiza los datos
router.get('/game/edit/:id', renderEditGame);
router.post('/game/edit/:id', updateGame);


//Query para determinar el ganador del juego (una vista con el ganador)
router.get('/game/:id/winner', winnerGame);


router.get("/games", renderGames);



//Query para consultar el juego y su estado (listado de jugadores y estados como tal del juego)
router.get('/game/:id',getGameById)

//query para eliminar juegos
router.delete('/game/:id',deleteGame)
router.post('/game/delete/:id',renderDelete)



module.exports = router;
