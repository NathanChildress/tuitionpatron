const router = require('express').Router();
const membersCtrl = require('../controllers/members');

// GET /members
router.get('/members', membersCtrl.index);



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('auth/google');
}

module.exports = router;
