const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('./model')

router.post('/user', function (req, res, next) {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    User
        .create(user)
        .then(user => res.json(user))
        .catch(err => next(err))
})

module.exports = router
