const Member = require('../models/member');

module.exports = {
    index,
}

function index(req, res) {
    console.log(this)
    Member.find({}, function(err, members) {
        console.log("member.find")
        res.render('members/index', {
            title: "Members",
            members,
            user: req.user
        })
    })
}

function update(req, res) {
    console.log("update")
}

function create(req, res) {
    console.log("create")
}