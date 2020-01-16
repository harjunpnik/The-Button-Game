const clickRouter = require('express').Router()
const Click = require('../models/click')
const User = require('../models/user')
const cryptoScripts = require('../utils/cryptoScripts')

// Function for returning the prize point amount based on current amount of clicks
function checkPrize(clickAmount){

    if(clickAmount % 500 === 0){
        return 250
    }else if(clickAmount % 100 === 0){
        return 40
    }else if(clickAmount % 10 === 0){
        return 5
    }else{
        return 0
    }
}

// MAIN METHOD OF GAME
// Takes in as parameter user hashed id and increments counter, reduces and adds points based on click result
clickRouter.patch('/:id', (req,res, next) => {
    // GLOBAL VARIABLE THAT IS SET ON STARTUP (dbSetup.js). ID of database entry for clicks
    const id = clickID
    
    // Decrypt userId 
    const userId = cryptoScripts.decryptUserId(req.params.id)

    // Check users points before incrementing counter
    let startingPoints = 0
    User
        .findById(userId)
        .then(u =>{
            if(u){
                startingPoints = u.points
            }else{
                // User not found
                return res.status(404).send({ error: 'Not Found' }) 
            }
        })
        .catch(error => next(error))
        .then(e=>{

            // if Not enough points
            if(startingPoints < 1){
                return res.status(400).json({'Error' : 'Users points are insufficient'})
            }else{

                Click
                .findByIdAndUpdate(id, { $inc: { amount: 1 } }, {new: true } )
                .then(update => {

                    const prize = checkPrize(update.amount)

                    //Check for user ID
                    

                    let currentPoints = 0

                    if(prize == 0){
                        User
                        .findByIdAndUpdate(userId, { $inc: { points: -1 } }, {new: true } )
                        .then(update => {
                            console.log(update.points)
                            //res.json(update.toJSON())
                            currentPoints = update.points
                            //res.json({"points" : update.points })
                            return res.status(200).json({"reward" : prize, "points" : currentPoints})
                        })               

                    }else{
                        const awardedPoints = Number(-1) + Number(prize)
                        console.log("awarded points", awardedPoints )
                        User
                        .findByIdAndUpdate(userId, { $inc: { points: awardedPoints } }, {new: true } )
                        .then(update => {
                            console.log(update.points)
                            //res.json(update.toJSON())
                            currentPoints = update.points
                            //res.json({"points" : update.points })
                            res.json({"reward" : prize, "points" : currentPoints})
                        })
                    }

                })

            }

        })

})




module.exports = clickRouter