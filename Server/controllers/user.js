const userRouter = require('express').Router()
const User = require('../models/user')
const crypto = require('crypto')

userRouter.get('/', (req,res) => {
    User
        .find({})
        .then(u =>{
            res.json(u)
        })
})

function decryptUserId(hash){

    const algorithm = 'aes-192-cbc'
    const password = 'ButtonGameHash Password';
    const key = crypto.scryptSync(password, 'salt', 24)
    const iv = Buffer.alloc(16, 0) // Initialization vector.

    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    let decrypted = decipher.update(hash, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    decrypted = decrypted.replace(/"/g,'')

    return decrypted
}

userRouter.get('/:id', (req,res) => {
    const userId = decryptUserId(req.params.id)

    User
        .findById(userId)
        .then(document =>{
            if(document){
                res.json(document.toJSON())
            }else{
                res.status(404).send({ error: 'Not Found' }) 
            }
        })
})


userRouter.post('/', (req,res) => {

    const newUser = new User ({
        points: 20
    })

    newUser
        .save()
        .then(result => {
            const algorithm = 'aes-192-cbc'
            const password = 'ButtonGameHash Password';
            const key = crypto.scryptSync(password, 'salt', 24)
            const iv = Buffer.alloc(16, 0) // Initialization vector.

            const cipher = crypto.createCipheriv(algorithm, key, iv)

            let encrypted = cipher.update(JSON.stringify(result._id), 'utf8', 'hex')
            encrypted += cipher.final('hex')
            console.log(encrypted)

            res.status(201).json({ points: result.points, user: encrypted })

        })
})


userRouter.patch('/remove/:id', (req,res) => {
    const userId = decryptUserId(req.params.id)

    User
        .findByIdAndUpdate(userId, { $inc: { points: -1 } }, {new: true } )
        .then(update => {
            console.log(update.points)
            //res.json(update.toJSON())

            res.json({"points" : update.points })
        })
})

userRouter.patch('/add/:id/:amount', (req,res) => {
    const userId = decryptUserId(req.params.id)
    const awardedPoints = Number(-1) + Number(req.params.amount)
    console.log("awarded points", awardedPoints )

    User
        .findByIdAndUpdate(userId, { $inc: { points: awardedPoints } }, {new: true } )
        .then(update => {
            console.log(update.points)
            //res.json(update.toJSON())

            res.json({"points" : update.points })
        })
})



module.exports = userRouter