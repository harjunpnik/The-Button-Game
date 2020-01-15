const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false) 

const userSchema = new mongoose.Schema({
    points: Number,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)