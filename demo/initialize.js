const Member = require('../models/member');
const Artist = require('../models/artist');
const Medium = require('../models/medium');
const Profile = require('../models/profile');
const Role = require('../models/role');
const Work = require('../models/work');


function init(cb) {
//We need to make sure our DB has an entry for our modelsto test things.
Role.find({}, function(err, role) {
    if(err) return cb(err);
    if(role.length) {
        console.log(`Found Role: ${role}`)
        return role;
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
    });


//If there are no members, create a dummy one.
Member.find({}, function(err, member) {
        if(err) return cb(err);
        if(member.length) {
            console.log(`Found a Member: ${member}`)
            return member;
        } else {
            //we have a new member
            console.log('Creating Demo User');
            const newMember = new Member({
                name:"Demo Name",
                email: "No@email.com",
                
            });
        newMember.save(function(err) {
            if (err) return cb(err);
            return newMember;
        })
        }
    })
cb()
//end our initialize
}

module.exports= {
    init,
}
