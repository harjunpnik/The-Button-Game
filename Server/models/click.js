const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false) 

// TODO ADD REQUIRE TO NUMBER AND TESTING
const clickSchema = new mongoose.Schema({
    amount: Number,
})

module.exports = mongoose.model('Click', clickSchema)