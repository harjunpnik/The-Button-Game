const clickRouter = require('express').Router()
const Click = require('../models/click')

clickRouter.get('/', (req,res) => {
    Click
        .find({})
        .then(click =>{
            res.json(click)
        })
})

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

clickRouter.patch('/', (req,res) => {
    // GLOBAL VARIABLE THAT IS SET ON STARTUP (dbSetup.js)
    const id = clickID

    Click
        .findByIdAndUpdate(id, { $inc: { amount: 1 } }, {new: true } )
        .then(update => {
            console.log(update.amount)
            //res.json(update.toJSON())

            res.json({"reward" : checkPrize(update.amount)})
        })
})

module.exports = clickRouter