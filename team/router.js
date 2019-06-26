const express = require('express')
const router = express.Router()
const Team = require('./model')

router.get('/team', function (req, res, next) {
    Team.findAll()
        .then(teams => res.json({teams: teams}))
        .catch(err => next(err))
})

router.post('/team', function (req, res, next) {
    Team
        .create(req.body)
        .then(teams => res.json(teams))
        .catch(err => next(err))
})

module.exports = router
