const router = require('express').Router();
const isAdmin = require(global.rootDir + '/routes/authMiddleware.js').isAdmin;
const connection = require(global.rootDir + '/scripts/database.js');
const User = connection.models.users;
const path = require('path');

router.get('/', isAdmin, (req, res) => {
    res.render('admin');
});

// USERS 

router.get('/users', isAdmin, (req, res) => {
    User.find({}, (err, usersList) => {
        if (err) {
            console.error(err);
        } else {
            res.render('admin_users', { users: usersList })
        }
    }).lean();

});

router.get('/users/view/*', isAdmin, (req, res) => {
    const idUser = path.basename(req.path);
    User.findOne({ _id: idUser }, (err, user) => {
        if (err) {
            console.error(err);
        } else {
            res.render('viewUser', { user: user })
        }
    }).lean();
});

module.exports = router