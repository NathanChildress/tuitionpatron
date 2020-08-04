const Member = require('../models/member');

module.exports = {
    index,
}

function index(req, res) {
    console.log(this)
    Member.find({}, function(err, members) {
        console.log("memer.find")
        res.render('members/index', {
            members,
            user: req.user
        })
    })
}