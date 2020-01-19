const mongoose = require('mongoose')
const cryptoScripts = require('../utils/cryptoScripts')

mongoose.set('useFindAndModify', false) 

// TODO ADD REQUIRE TO NUMBER AND TESTING
const userSchema = new mongoose.Schema({
    points: Number,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.user = cryptoScripts.encryptUserId(returnedObject._id.toString())
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)