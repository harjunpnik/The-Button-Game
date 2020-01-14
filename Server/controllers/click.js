const clickRouter = require('express').Router()
const Click = require('../models/click')

clickRouter.get('/', (req,res) => {
    Click
        .find({})
        .then(click =>{
            res.json(click)
        })
})

clickRouter.patch('/', (req,res) => {
    //const id = process.env.CLICK_ID

    // GLOBAL VARIABLE THAT IS SET ON STARTUP
    const id = clickID

    Click
        .findByIdAndUpdate(id, { $inc: { amount: 1 } }, {new: true } )
        .then(update => {
            res.json(update.toJSON())
        })
})

// clickRouter.post('/', (req,res) =>{

//     const newClick = new Click ({
//         amount: 0
//     })


//     newClick
//         .save()
//         .then(result => {
//             res.status(201).json(result)
//     })
// })

module.exports = clickRouter