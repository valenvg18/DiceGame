const express = require('express');
const Handlebars = require('handlebars');
let exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const morgan = require('morgan');


//Initializations
const app = express();


//Settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');


//Middlewares
app.use(express.urlencoded({ extended:false }));
app.use(morgan('dev'));


//Global Variables


//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/game.routes'));
/* app.get('/', (req, res) => {
    res.render('index');
}); */


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;