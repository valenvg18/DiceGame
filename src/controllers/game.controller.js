const gameCtrl = {};
const Game = require('../models/game');
//const ObjectId = require('mongoose').Types.ObjectId;

gameCtrl.renderGameForm = (req, res) => {
    res.render('createGame');
};

gameCtrl.createGame = (req, res) => {
    const {type, gamers} = req.body;
    const newGame = new Game ({
        type: req.body.type,
        gamers: req.body.gamers
    });
    console.log(newGame);

   /*  game.save()
        .then((result) => {res.json({
            "type": result.type,
            "gamers": [
                result.gamers[0].name,
                result.gamers[1].name,
                result.gamers[2].name,
            ]
        })})
        .catch((err) => {
            res.json(err)
        }); */
    //console.log(req.body);
    
    res.send('New Game');
};

gameCtrl.renderStartGame = (req, res) => {
    res.send('Render start Game');
};

gameCtrl.startGame = (req, res) => {
    res.send('Start Game');
};

gameCtrl.renderEditGame = (req, res) => {
    res.send('Render edit game');
};

gameCtrl.updateGame = (req, res) => {
    res.send('Update game');
};

gameCtrl.winnerGame = (req, res) => {
    res.send('Winner');
};


module.exports = gameCtrl;