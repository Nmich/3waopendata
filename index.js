require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//création d'une application express
var app = express();

// creation d'une route en get pour afficher Hello world
app.set('view engine', 'pug'); //indique à Express que le moteur de templating à utliser est "pug"
app.set('views', './views'); // indique à Express que les dossiers contenant les templates est "./views"

/**
 * Configurationdes middlewares de l'application
 */
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret: 'opendata3wa rocks',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));
app.use(flash());
app.use((req, res, next) =>{
    app.locals.flashMessages = req.flash()
    next()
})

app.use(passport.initialize())
app.use(passport.session())

/**
 * Configuration des routes de l'application
 */

require('./app/passport')(passport);
require('./app/routes')(app, passport)
//Connexion à la base de donées, et ensuite (then) on démarre le serveur
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`, {useNewUrlParser: true})
    .then(() =>{
        //démarrage du serveur (uniquement après que la connexion à la BDD soit établie) sur le serveur http://localhost:8888
        app.listen(8888,() => {
            console.log(`Le serveur à démarré sur http://localhost:8888`)
            });
})
