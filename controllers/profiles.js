const Profile = require('../models/profile');
const Artist = require('../models/artist');

module.exports = {
    show,
    update,
}


function update(req, res) {
    console.log("update")
}

function show(req, res) {
    console.log("show")
    Profile.findOne({'member':req.user.id}).populate('member').exec(function(err, profile) {
        if(err) return cb(err);
        Artist.findOne({'member':req.user.id}, function(err, artist){
            if(err) return cb(err);
            res.render('profiles/show', {
                title: `Profile ${profile.member.name}`,
                artist,
                profile,
                user: req.user,
            })
        })
    })
}