const Work = require('../models/work');
const Artist = require('../models/artist');
const Medium = require('../models/medium');

module.exports = {
    index,
    show,
    update,
    new: newWork,
    create,
}

function index(req, res) {
    console.log("index")
    Work.find({}).populate('artistId').exec(function(err, works) {
        console.log(`work.find: ${works}`)
        res.render('works/index', {
            title: "works",
            works,
            user: req.user
        })
    })
}

function show(req, res, cb) {
    console.log("show")
    Work.findById(req.params.id).populate('artistId')
        .populate('workMediums')
        .populate({
            path: 'artistId',
            populate: {
                path: 'member'
            }
        }).exec(function(err, work) {
        
        if(err) return cb(err);
        console.log(work);
        res.render('works/show', {
            title: `work ${work.name}`,
            work,
            user: req.user,
        })
    })
}

function update(req, res) {
    console.log("update")
}

function create(req, res) {
    console.log("create")
    Work.create({'artistId':req.params.id}, function (err, work) {
        console.log(work)
        work.commissions.push(req.body);
        work.save(function(){
            res.redirect(`/artists/${req.params.id}`)
        })
    })
}

function newWork(req, res, cb) {
    console.log("new")

    const mediums = Medium.find({}, function(err, mediums){
        console.log(mediums);
        Artist.findById(req.params.id).populate('member').exec(function(err, artist) {
            if(err) return cb(err);
            res.render('works/new', {
                title: `New ${artist.member.name} Commission`,
                artist,
                mediums,
                user: req.user,
            })
        })
    });
    console.log(mediums);

}