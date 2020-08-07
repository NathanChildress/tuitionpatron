const router = require('express').Router();
const methodOverride = require('method-override');
const worksCtrl = require('../controllers/works');

router.use(methodOverride('_method'));

// GET /works
router.get('/works', worksCtrl.index);
router.get('/works/:id/new', worksCtrl.new);
router.get('/works/:id/update', worksCtrl.update);
router.get('/works/:id', worksCtrl.show);

router.post('/works/:id/new', worksCtrl.create);

router.delete('/works/:id/delete', worksCtrl.delete);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;