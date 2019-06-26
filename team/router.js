const express = require('express')
const router = express.Router()
const Team = require('./model')

router.get('/team', function (req, res, next) {
    Team.findAll()
        .then(teams => res.json({ teams: teams }))
        .catch(err => next(err))
})

router.post('/team', function (req, res, next) {
    Team
        .create(req.body)
        .then(teams => res.json(teams))
        .catch(err => next(err))
})

router.get('/team/:id', function (req, res, next) {
    const id = req.params.id
    Team.findByPk(id)
        .then(teams => res.json(teams))
        .catch(err => next(err))
})

router.put('/team/:id', function (req, res, next) {
    const id = req.params.id
    // const { id } = req.params
    const name = req.body.name
    // const { name } = req.body
    Team.findByPk(id)
        .then(team => {
            return team.update({ name })
        })
        .then(team => res.json(team))
        .catch(err => next(err))
})

module.exports = router
