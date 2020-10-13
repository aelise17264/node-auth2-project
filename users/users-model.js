const db = require('../database/connection')

module.exports ={
    addUser,
    findUser,
    findUserBy,
    findUserById
}

function findUser(){
    return db('users').select('id', 'username', 'department').orderBy('id')
}

function findUserBy(filter){
    return db('users')
    .select('*')
    .where(filter)
    .orderBy('users.id')
}

function addUser(user){
    return db('users').insert(user)
}

function findUserById(id){
    return db('users').where({id}).first()
}