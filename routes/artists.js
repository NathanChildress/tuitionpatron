const router = require('express').Router();
const artistsCtrl = require('../controllers/artists');

// GET /artists
router.get('/artists', artistsCtrl.index);
router.get('/artists/:id', artistsCtrl.show);
router.get('/artists/:id/new', artistsCtrl.new);

router.post('/artists/:id/new', artistsCtrl.create);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;
