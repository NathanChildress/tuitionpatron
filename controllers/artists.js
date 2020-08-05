const Artist = require('../models/artist');

module.exports = {
    index,
    show,
    update,
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