/* Configuration of local MongoDB */

const mongoose= require('mongoose');
const {MONGO_USER, MONGO_PASSWORD} = require("../constants/env.constant");

const uri = "mongodb+srv://" + MONGO_USER + ":" + MONGO_PASSWORD + "@mongocluster.8jay5x8.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=MongoCluster";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
