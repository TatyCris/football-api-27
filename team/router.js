const express = require('express')
const router = express.Router()
const Team = require('./model')

router.get('/team', function (req, res, next) {
    Team.findAll()
        .then(team => res.json({ teams: team }))
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
            next()
        })
})

module.exports = router
