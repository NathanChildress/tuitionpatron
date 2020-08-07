const Work = require('../models/work');
const Artist = require('../models/artist');
const Medium = require('../models/medium');

module.exports = {
    index,
    show,
    update,
    new: newWork,
    create,
    delete: workDelete,
}

function index(req, res) {
    console.log("index")
    Work.find({}).populate('artistId').exec(function(err, works) {
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

function update(req, res, cb) {
    console.log("update")
    Work.findByIdAndUpdate(req.params.id, {"commissions.0.approved": true}, function(err, work) {
        if(err) return cb(err);
        res.redirect('/works');
 
    })
}

function create(req, res) {
    console.log("create")
    Artist.findById(req.params.id, function(err, artist){
        Work.create({'artistId':artist._id}, function (err, work) {
            console.log(req.body)
            if(req.user && (artist.member == req.user.id)) {
                req.body.approved = true
            }
            work.commissions.push(req.body);
            work.save(function(){
                res.redirect(`/artists/${req.params.id}`)
            })
        })
    })
}

function newWork(req, res, cb) {
    console.log("new")

    const mediums = Medium.find({}, function(err, mediums){
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

function workDelete(req, res, cb) {
    console.log("delete")

    Work.findByIdAndDelete(req.params.id, function(err, result){
        console.log(err)
        res.redirect(`/works`)
    })
}