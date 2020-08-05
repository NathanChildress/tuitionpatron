const router = require('express').Router();
const adminCtrl = require('../controllers/admin');

// GET /admin
router.get('/admin', adminCtrl.index);
router.get('/admin/:id', adminCtrl.show);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;