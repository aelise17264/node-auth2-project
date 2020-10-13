const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Users = require('./users-model')
const restricted = require('../auth/restricted')

router.get('/', restricted, (req, res) => {
    Users.findUser()
    .then(users => {
        res.status(200).json({users, jwt: req.jwt})
    })
    .catch(error => res.send(error))
})