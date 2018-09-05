const User = require('./models/user.models')

module.exports = function(app) {

    /**
     * Route "/" : Page d'accueil du site web
     */

    app.get('/', (req, res) => {
        res.render('index') // Indique ici à Express de rendre le template "./views/index.pug"
    })

    /**
     * Route "/login" : Page de connexion
     */

    app.get('/login', (req, res) => {
        res.render('login')
    })

    /**
     * Route "/signup" : Page d'inscription
     */

    app.get('/signup', (req, res) => {
        res.render('register')
    })

    app.post('/signup', (req, res) => {
        // Insertion des données en bases via le modèle Mongoose
        User.signup(
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.pass,
            req.body.pass_confirmation
        ).then(() => res.redirect('/?signup=ok'))
        .catch(errors => {
            res.render('register', { errors, user: req.body })
        })
    })

}