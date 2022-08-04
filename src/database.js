const mongoose = require('mongoose');

//const MONGODB_URI = process.env.MONGODB_URI;
const { DICE_GAME_MONGODB_HOST, DICE_GAME_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${DICE_GAME_MONGODB_HOST}/${ DICE_GAME_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected'))
    .catch(err => console.error(err));