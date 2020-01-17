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
    let userFound = false
    User
        .findById(userId)
        .then(u =>{
            if(u){
                startingPoints = u.points
                userFound = true
            }else{
                // User not found
                return res.status(404).json({ error: 'User not Found' }) 
            }
        })
        .then(()=>{

            // if Not enough points and user was found
            if(startingPoints < 1 && userFound){
                return res.status(400).json({'Error' : 'Users points are insufficient'})

            // if enough points and user was found
            }else if (userFound){
                // Increment clicks 
                Click
                    .findByIdAndUpdate( id, { $inc: { amount: 1 } }, {new: true } )
                    .then(update => {
                        // Check what prize to give based on clicks
                        const prize = checkPrize(update.amount)   
                        const clicksToNextPrize = 10 - (update.amount % 10)

                        if(prize == 0){
                            // Find user by id and decrease points
                            User
                                .findByIdAndUpdate( userId, { $inc: { points: -1 } }, { new: true } )
                                .then(update => {
                                    // Return rewarded points (0 in this case) and current points of user after the click
                                    return res.status(200).json({"reward" : prize, "points" :  update.points, "nextPrize" : clicksToNextPrize })
                                })               

                        }else{
                            // calculate awarded points. ( -1 for click and add the prize points amount )
                            const awardedPoints = Number(-1) + Number(prize)
                            // Find user by id and update points
                            User
                                .findByIdAndUpdate( userId, { $inc: { points: awardedPoints } }, { new: true } )
                                .then(update => {
                                    // Return rewarded points (0 in this case) and current points of user after the click
                                    return res.status(200).json({"reward" : prize, "points" :  update.points, "nextPrize" : clicksToNextPrize })
                                })
                        }
                    })
            }

        })
        .catch(error => next(error))
})




module.exports = clickRouter