const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017";

const connectToMongo = async () => {

    try{
        mongoose.connect(mongoURI);
        console.log("Database Got Connected")
    }
    catch(error){
        console.log("error found: " + error)

    }

}


module.exports = connectToMongo;