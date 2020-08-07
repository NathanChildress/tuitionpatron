const router = require('express').Router();
const worksCtrl = require('../controllers/works');

// GET /works
router.get('/works', worksCtrl.index);
router.get('/works/:id/new', worksCtrl.new);
router.get('/works/:id/update', worksCtrl.update);
router.get('/works/:id', worksCtrl.show);

router.post('/works/:id/new', worksCtrl.create);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;