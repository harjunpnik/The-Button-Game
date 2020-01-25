const userRouter = require('express').Router()
const User = require('../models/user')
const cryptoScripts = require('../utils/cryptoScripts')

// TODO DELETE?, No intended use except for testing
userRouter.get('/', (req,res) => {
    User
        .find({})
        .then(user =>{
            res.json(user)
        })
})

// GET USER AND POINTS
userRouter.get('/:id', (req,res) => {
    const userId = cryptoScripts.decryptUserId(req.params.id)

    // Find user by id
    User
        .findById(userId)
        .then(user =>{
            if(user){
                res.status(200).json(user.toJSON())
            }else{
                res.status(404).json({ error: 'Not Found' }) 
            }
        })
})

// CREATE NEW USER
userRouter.post('/', (req,res,next) => {

    const newUser = new User ({
        points: 20
    })

    newUser
        .save()
        .then(result => {
            // Encrypt user id and send to user. Done to make sure only allowed methods complete sucessfully
            const encrypted = cryptoScripts.encryptUserId(result._id)

            res.status(201).json({ points: result.points, user: encrypted })

        })
        .catch(error => next(error))
})

// RESET USER POINTS TO 20
userRouter.patch('/reset/:id', (req,res,next) => {
    const userId = cryptoScripts.decryptUserId(req.params.id)
    
    let usersPoints = 0
    let userFound = false

    User
        .findById(userId)
        .then(user =>{
            
            if(user){
                usersPoints = user.points
                userFound = true
            }else{
                // User not found
                res.status(404).json({ error: 'User not Found' }) 
            }
        })
        .then(()=>{
            // If user found and has points 
            if(usersPoints > 1 && userFound){
                
                res.status(400).json({ error: 'User has still points' }) 
            
            // if user found and has 0 points
            }else if(userFound && usersPoints < 1){
                // Rest user points to 20
                User
                .findByIdAndUpdate(userId,  {points: 20} , {new: true } )
                .then(update => {
                    res.status(200).json(update.toJSON())
                })
            }
        })
        .catch(error => next(error))


})



module.exports = userRouter