const User = require('./models/user.models')

module.exports = function(app,passport) {
    app.use((req,res,next) =>{
        app.locals.user = req.user;
        next();
    })

    /**
     * Route "/" : Page d'accueil du site web
     */

    app.get('/', (req, res) => {
        res.render('index'); // Indique ici à Express de rendre le template "./views/index.pug"
    })

    /**
     * Route "/login" : Page de connexion
     */

    app.get('/login', (req, res) => {
        res.render('login');
    })
    // Lorsqu'on tente de se connecter, c'est le middleware de passport qui prend la main, avec la stratégie "locale" (configurée dans ./passport.js )
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        badRequestMessage: 'Identifiants non valides!',
        failureFlash: true,
        successFlash: { message: 'Connexion réussie. Bienvenue !' }
    }))
    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', passport.authenticate('github', {
    	successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        successFlash: { message: 'Connexion réussie avec Github. Bienvenue !' }
    }));

    /**
     * Route "/signup" : Page d'inscription
     */
    app.get('/signup', (req, res) => {
        res.render('register')
    })
    /**
     * Route "/logout" : Page de connexion
     */

    app.get('/logout', (req, res) => {
        req.logout('logout');
        req.flash('success','Vous êtes déconneceté');
        res.redirect('/');
    })

    app.post('/signup', (req, res) => {
        // Insertion des données en bases via le modèle Mongoose
        User.signup(
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            req.body.pass,
            req.body.pass_confirmation
        ).then(() => {
            req.flash('success', 'Inscription réussie ! Vous pouvez maintenant vous connecter.')
            res.redirect('/')
        }).catch(errors => {
            res.render('register', { errors, user: req.body })
        })
    })

}