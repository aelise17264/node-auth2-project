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

async function addUser(usere){
    try{
        const [id] = await db('users').insert(user, 'id')
        return findUserById(id)
    }catch (error){
    throw error
    }
}

function findUserById(id){
    return db('users').where({id}).first()
}