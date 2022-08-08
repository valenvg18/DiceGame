const gameCtrl = {};
const { json } = require("express");
const Game = require("../models/game");
const ObjectId = require("mongoose").Types.ObjectId;

gameCtrl.renderGameForm = (req, res) => {
  res.render("createGame");
};

gameCtrl.renderGames = async (req, res) => {
  const games = await Game.find().sort({ createdAt: "desc" }).lean();
  res.render("games", { games });
};

gameCtrl.createGame = async (req, res) => {

    console.log(req.body);
  const gamers = [
    { name: req.body.gamers[0] },
    { name: req.body.gamers[1] },
    { name: req.body.gamers[2] },
  ];

  const game = new Game({
    id: req.body.id,
    type: req.body.type,
    gamers: gamers,
  });
  await game
    .save()
    .then((result) => {
      console.log("result", result);

      res.redirect("/games");
    })
    .catch((err) => {
      res.json(err);
    });
};

gameCtrl.getGames = (req, res) => {
  Game.find(function (err, games) {
    if (err) res.send(500, err.message);

    console.log("GET /games");

    res.status(200).jsonp(games);
  });
};

gameCtrl.renderStartGame = async (req, res) => {
  const gameById = await Game.findById(req.params.id);
  console.log(gameById);
  res.render("startGame", { gameById });
};

gameCtrl.startGame = async (req, res) => {
    console.log(req.body);
  const multipleBets = [
    { bet: req.body.bet[0] },
    { bet: req.body.bet[1] },
    { bet: req.body.bet[2] },
  ];

  let body = req.body;
  for (let i = 0; i < 3; i++) {
    Game.findOne({ _id: req.params.id })
      .then((result) =>
        Game.updateOne(
          { _id: req.params.id },
          { $set: { "gamers.$[gamer].bet": multipleBets[i].bet } },
          {
            arrayFilters: [
              { "gamer._id": { $eq: ObjectId(result.gamers[i]._id) } },
            ],
          }
        )
      )
      .catch((err) => {
        res.json(err);
      });
  }
  setTimeout(() => {
    Game.findOne({ _id: req.params.id })
      .then((result) => {
        res.json({
          id: result._id,
          type: "",
          gamerBet: {
            [result.gamers[0]._id]: result.gamers[0].bet,
            [result.gamers[1]._id]: result.gamers[1].bet,
            [result.gamers[2]._id]: result.gamers[2].bet,
          },
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }, 500);
  await Game.findOne({ _id: req.params.id }).then((result) => {
    var inProgress = true;
    while (inProgress) {
      let num = numRand(1, 12);
      console.log("apuesta:", num);
      for (let i = 0; i < 3; i++) {
        if (num ===result.gamers[i].bet) {
          inProgress = false;
          Game.updateOne(
            { _id: req.params.id },
            {
              $set: {
                winner: { name: result.gamers[i].name },
              },
            }
          ).catch((err) => console.log(err));
          break;
        }
      }
    }
  });

  // TODO  pendiente implemantar para redirgir a la pantalla del ganador del juego
  //   res.redirect(`/game/${req.params.id}/winner`);

};

gameCtrl.renderEditGame = (req, res) => {
  res.send("Render edit game");
};

gameCtrl.updateGame = (req, res) => {
  res.send("Update game");
};

gameCtrl.winnerGame = async (req, res) => {
  var winnerInfo;
  const id = req.params.id;
  let winExist = false;
  Game.findById(id).then((result) => {
    for (let i = 0; i < 3; i++) {
      if (result.gamers[i].name === result.winner.name) {
        winnerInfo = new Game({
          winner: {
            name: result.winner.name,
            id: result.gamers[i]._id,
          },
        });
        winExist = true;
        break;
      }
    }
  });
  Game.findById(id)
    .then(() => {
      if (winExist === false) {
        res.json({
          winner: "No hay ganador, por favor vuelva a iniciar el juego",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });

  console.log("ganador:", winnerInfo);
  res.render("winner", { winnerInfo });
};

function numRand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

gameCtrl.deleteGame = async (req, res) => {
  Game.findById(req.params.id, function (err, game) {
    game.remove(function (err) {
      if (err) return res.status(500).send(err.message);
    });
  });
  res.redirect("games");
};

gameCtrl.renderDelete = async (req, res) => {
  Game.findById(req.params.id, function (err, game) {
    game.remove(function (err) {
      if (err) return res.status(500).send(err.message);
    });
  });
  res.redirect("http://localhost:8080/games");
};

gameCtrl.getGameById = function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) return res.send(500, err.message);

    console.log("GET /games/" + req.params.id);
    res.status(200).jsonp(game);
  });
};

module.exports = gameCtrl;
