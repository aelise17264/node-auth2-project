const jwt = require('jsonwebtoken')

const {jwtSecret} = require('../api/config')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token){
        jwt.verify(token, jwtSecret, (error, decodedToken) => {
            if(error){
                res.status(401).json({message: 'You do not know the secret'})
            }else{
                req.jwt = decodedToken
                next()
            }
        })
    }else{
        res.status(401).json({message: 'we need your credentials'})
    }

}