const { Router } = require('express')
const { toJWT, toData } = require('./jwt')

const router = new Router()

router.post('/logins', function (req, res, next) {
    const email = req.body.email
    const password = req.body.password

    if (email === '' && password === '') {
        return res.status(400).send({
            message: 'Please supply a valid email and password'
        })
    } else {
        return res.send({
            jwt: toJWT({ userId: 1 })
        })
    }
})

router.get('/secret-endpoint', (req, res) => {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try {
            const data = toData(auth[1])
            res.send({
                message: 'Thanks for visiting the secret endpoint.',
                data
            })
        }
        catch (error) {
            res.status(400).send({
                message: `Error ${error.name}: ${error.message}`,
            })
        }
    }
    else {
        res.status(401).send({
            message: 'Please supply some valid credentials'
        })
    }
})

module.exports = router

// If you would like to make a request to a secret route, you would use the JWT token like this:
// http :4000/secret-endpoint Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTUzNTM2MjIzMCwiZXhwIjoxNTM1MzY5NDMwfQ.DxFRClbZLP0L-fczkSiNHEiLqYI4HGbC8Ezrh3JhlG8"
// http :4000/secret-endpoint Authorization:"Bearer <token>"

