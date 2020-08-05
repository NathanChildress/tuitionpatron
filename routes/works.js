const router = require('express').Router();
const worksCtrl = require('../controllers/works');

// GET /works
router.get('/works', worksCtrl.index);
router.get('/works/:artistId/new', worksCtrl.new);
router.get('/works/:id', worksCtrl.show);




function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;