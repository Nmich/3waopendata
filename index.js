require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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
require("./app/routes")(app);

//Connexion à la base de donées, et ensuite (then) on démarre le serveur
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`, {useNewUrlParser: true})
    .then(() =>{
        //démarrage du serveur (uniquement après que la connexion à la BDD soit établie) sur le serveur http://localhost:1337
        app.listen(1337,() => {
            console.log(`Le serveur à démarré sur http://localhost:1337`)
            });
})
