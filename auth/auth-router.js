const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const config = require('../api/config')

const Users = require('../users/users-model')
//const {isValid} = require('../users/users-service')

router.post('/register', (req, res) => {
    let credentials = req.body;

    const hash = bcryptjs.hashSync(credentials.password, 8 )
    credentials.password = hash


    Users.addUser(credentials)
    .then(user => {
        const token = getJwt(user)
        res.status(201).json({data: user, token})
    })
    .catch(error => {
        res.status(500).json({error: 'must enter valid username, password and department'})
    })
    
})

router.post('/login', (req, res) => {
    const {username, password} = req.body

    if(req.body){
        Users.findUserBy({username: username})
        .then(([user]) => {
            if(user && bcryptjs.compareSync(password, user.password)){
                const token = getJwt(user)
                res.status(200).json({message: 'Welcome to the team', token})
            }else{
                res.status(401).json({message: 'Invalid credentials'})
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
    }else{
        res.status(400).json({message: "please provide username and password and the password shoud be alphanumeric",
    })
    }
})

function getJwt(user){
    const payload = {
        username: user.username,
        department: user.department
    }
    const jwtOptions ={
        expiresIn: '2h',
    }
return jwt.sign(payload, config.jwtSecret, jwtOptions)
}

module.exports = router