const Artist = require('../models/artist');
const Profile = require('../models/profile');
const Medium = require('../models/medium');
const Work  = require('../models/work');


module.exports = {
    index,
    show,
    update,
    new: newArtist,
    create,
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
            res.render('artists/new', {
                title: `New ${profile.member.name} Artist Profile`,
                profile,
                mediums,
                user: req.user,
            })
        })
    });
}

function create(req, res) {
    console.log("create")
    Artist.create({'member':req.params.id}, function (err, artist) {
        artist.save(function(){
            res.redirect(`/artists/${artist._id}`)
        })
    })  
}