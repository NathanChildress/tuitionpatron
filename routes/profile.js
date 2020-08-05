const router = require('express').Router();
const artistsCtrl = require('../controllers/profiles');

// GET /artists
router.get('/profiles/:id', artistsCtrl.show);
router.put('/profiles/:id', artistsCtrl.update);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;