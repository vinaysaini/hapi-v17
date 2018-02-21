'use strict';
var mongoURL

mongoURL = "mongodb://localhost/hapi-v17";


var mongo = {
    URI: mongoURL,
    port: 27017
};


module.exports = {
    mongo: mongo
};