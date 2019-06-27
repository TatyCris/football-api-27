const Team = require('../team/model')
const express = require('express')
const router = express.Router()
const Player = require('./model')

router.get('/player', function (req, res, next) {
    const limit = req.query.limit || 25
    const offset = req.query.offset || 0

    Promise.all([
        Player.count(),
        Player.findAll({ limit, offset })
    ])
        .then(([total, players]) => {
            res.send({ players, total })
        })
        .catch(error => next(error))
})

router.post('/player', function (req, res, next) {
    Player
        .create(req.body)
        .then(players => res.json(players))
        .catch(err => next(err))
})

router.get('/player/:id', function (req, res, next) {
    const id = (req.params.id)
    Player
        .findByPk(id, { include: [Team] })
        .then(players => res.json(players))
        .catch(err => next(err))
})

router.put('/player/:id', function (req, res, next) {
    const id = (req.params.id)
    // const { id } = req.params
    const name = req.body.name
    // const { name } = req.body
    Player
        .findByPk(id, { include: [Team] })
        .then(team => {
            return team.update({ name })
        })
        .then(team => res.json(team))
        .catch(err => next(err))
})

module.exports = router