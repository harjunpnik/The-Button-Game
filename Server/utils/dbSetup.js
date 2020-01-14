// SAVES NEW BASE ENTRY FOR CLICKS COLLECTION
function createNewEntry(message){
    const Click = require('../models/click')

    const newClick = new Click ({
        amount: 0
    })

    newClick
        .save()
        .then(res => {
            // Save ID for Click entry in DB for use in click.js controller updates
            global.clickID = res._id
            console.log(message, res._id)
        })
}


// SETUP CLICKS DB COLLECTION, checks for if clicks collection and click entry exists. If not, then it will create/update/fix a entry 
function setupClicksDB(){
    const mongoose = require('mongoose')
    const config = require('./config')

    const mongoUrl = config.MONGODB_URI // MongoDB connection URL

    // Create a mongoose connection and check if there is a collection named "clicks" 
    const conn = mongoose.createConnection(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true})
    conn.on('open', function () {
        // list all collections from db
        conn.db.listCollections().toArray(function (err, collectionNames) {
            if (err) {
                throw err

            // IF COLLECTION DOES NOT EXIST
            }else if (collectionNames.find(c => c.name == "clicks") == undefined){
                // Create new entry function
                createNewEntry("New Collection and entry created. Using entry: ")
                conn.close()

            // IF COLLECTION EXISTS
            }else{
                conn.db.collection(collectionNames.find(c => c.name == "clicks").name).findOne({}, function(err, result) {
                    if (err) throw err

                    // IF COLLECTION EXISTS AND A ENTRY EXISTS
                    if(result !== null){

                        // IF COLLECTION EXISTS AND ENTRY IS VALID
                        if("amount" in result){
                            // Save ID for Click entry in DB for use in click.js controller updates
                            global.clickID = result._id
                            console.log("Old Collection found. Using old entry: ",clickID)
                            conn.close()

                        // IF COLLECTION EXISTS AND ENTRY HAS NO AMOUNT RESULT
                        }else{
                            conn.db.collection("clicks").updateOne({_id : result._id}, { $set: {amount: 0} }, function(err, res) {
                                if (err) throw err
                                global.clickID = result._id
                                console.log("Old Collection found. Faulty entry in db. Using fixed entry: ", result._id)
                                
                            })
                            conn.close()
                        }
                    
                    // IF COLLECTION EXISTS BUT NO ENTRY
                    }else{
                        // Create new entry function
                        createNewEntry("Old Collection found. Using new entry: ")
                        conn.close()
                    }
                })
            }
        })  
    })
}

module.exports = { setupClicksDB }