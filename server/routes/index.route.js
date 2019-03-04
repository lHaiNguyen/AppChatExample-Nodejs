const express = require('express');
const chatModel = require('../model/chats.model');

const router = express.Router();

router.get('/', function (req, res) {
    console.log(res.locals);
    res.render('index');
})
router.get('/login', function (req, res) {
    res.render('login');
})
router.post('/login', function (req, res) {
    let user_name = req.body.user_name;
    chatModel.findOne({
            user_name: user_name
        })
        .exec((err, data) => {
            if (data && data._id) {
                console.log('data: ' + data);
                res.render('login', {
                    errors: [
                        'User name has Exit'
                    ]
                })
            }
            return;
        })
    // res.locals.userName = req.body.userName;
    res.redirect('/');
})

module.exports = router;