const mongoose = require('mongoose')

const clickSchema = new mongoose.Schema({
    amount: Number,
})

clickSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Click', clickSchema)