var mongoose = require('mongoose');

var Config = require('../Config');
//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(Config.dbConfig.mongo.URI, function (err) {
    if (err) {
        console.log("DB Error: ", err);
        process.exit(1);
    } else {
        console.log('MongoDB Connected');
    }
});