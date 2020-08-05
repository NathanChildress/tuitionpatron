const router = require('express').Router();
const artistsCtrl = require('../controllers/artists');

// GET /artists
router.get('/artists', artistsCtrl.index);
router.get('/artists/:id', artistsCtrl.show);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;
