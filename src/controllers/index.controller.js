const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};

indexCtrl.createGame = (req, res) => {
    res.render('createGame');
};

indexCtrl.renderGame = (req, res) => {
    res.render('startGame');
};

indexCtrl.winnerGame = (req, res) => {
    res.render('winner');
};

module.exports = indexCtrl;