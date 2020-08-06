const Artist = require('../models/artist');
const Profile = require('../models/profile');
const Medium = require('../models/medium');

module.exports = {
    index,
    show,
    update,
    new: newArtist,
}

function index(req, res) {
    console.log("index")
    Artist.find({}).populate('member').exec(function(err, artists) {
        console.log(`artist.find: ${artists}`)
        res.render('artists/index', {
            title: "Artists",
            artists,
            user: req.user
        })
    })
}

function show(req, res, cb) {
    console.log("show")
    Artist.findById(req.params.id).populate('member').exec(function(err, artist) {
        if(err) return cb(err);
        res.render('artists/show', {
            title: `Artist ${artist.member.name}`,
            artist,
            user: req.user,
        })
    })
}

function update(req, res) {
    console.log("update")
}

function newArtist(req, res, cb) {
    console.log("new")

    const mediums = Medium.find({}, function(err, mediums){
        Profile.findOne({'member':req.params.id}).populate('member').exec(function(err, profile) {
            if(err) return cb(err);
            console.log(profile)
            res.render('artists/new', {
                title: `New ${profile.member.name} Artist Profile`,
                profile,
                mediums,
                user: req.user,
            })
        })
    });
    console.log(mediums);

}