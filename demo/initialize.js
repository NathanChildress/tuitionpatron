const Member = require('../models/member');
const Artist = require('../models/artist');
const Medium = require('../models/medium');
const Profile = require('../models/profile');
const Role = require('../models/role');
const Work = require('../models/work');


function init(cb) {
//We need to make sure our DB has an entry for our modelsto test things.
Role.find({}, function(err, roles) {
    if(err) return cb(err);
    if(roles.length) {
        console.log(`Found Role(s): ${roles}`)
        return roles;
    } else {
        console.log(`We have to create our Roles`)
        console.log('Creating BasicMember')
        const newRole = new Role({
            roleName: "BasicMember",
            roleRank: 10,
        })
        newRole.save(function(err) {
            if (err) return cb(err);});
        const adminRole = new Role({
            roleName: "Admin",
            roleRank: 100
        })
        adminRole.save(function(err) {
            if (err) return cb(err);})
        }
        const demoRole = new Role({
            roleName: "Demo",
            roleRank: 9
        })
        demoRole.save(function(err) {
            if (err) return cb(err);})
    });


//If there are no members, create a dummy one.
Member.find({}, function(err, members) {
        if(err) return cb(err);
        if(members.length) {
            console.log(`Found a Member: ${members}`)
            return members;
        } else {
            //we have a new member
            console.log('Creating Demo User');
            Role.findOne({'roleName': 'Demo'}, function (err, roleDemo) {
                const newMember = new Member({
                    name:"Demo Name",
                    email: "No@email.com",
                    role: roleDemo.id
                });
                newMember.save(function(err) {
                    if (err) return cb(err);
                    return newMember;
                })
            })

        }
    })

Artist.find({}, function(err, artists) {
    if(err) return cb(err);
    if(artists.length) {
        console.log(`Found an Artist: ${artists}`)
        return;
    } else {
        console.log('Upgrading a member to artist');
        Member.findOne({'name': 'Demo Name'}, function (err, memberDemo){
            const newArtist = new Artist ({
                member: memberDemo.id,
                bio: "I'm a demo artist, interested in demoing things."
            })
            newArtist.save(function(err) {
                if(err) return cb(err);
                return newArtist;
            })
        })
    }
});

Medium.find({}, function(err, mediums) {
    if(err) return cb(err);
    if(mediums.length) {
        console.log(`Found medium(s): ${mediums}`)
        return mediums;
    } else {
        console.log(`We have to create our mediums`)
        console.log('Creating Oil on Canvas')
        const oilMedium = new Medium({
            mediumName: "Oil on Canvas",
            mediumMaterials: 'Oil paints, Canvas',
            mediumDesc: 'Oil canvas allows for deep and long lasting colors.'
        })
        oilMedium.save(function(err) {
            if (err) return cb(err);});
        const watercolorMedium = new Medium({
            mediumName: "Water paints on Canvas",
            mediumMaterials: 'water paints, Canvas',
            mediumDesc: 'Waterpaints on canvas allows for soft pastels.'
        })
        watercolorMedium.save(function(err) {
            if(err) return cb(err); });

        const demomedium = new Medium({
            mediumName: "DemoMedium",
            mediumMaterials: "Demosium",
            mediumDesc: "Demo material is only limited by the imagination."
        })
        demomedium.save(function(err) {
            if (err) return cb(err);})
    }});



cb()
//end our initialize
}

module.exports= {
    init,
}
