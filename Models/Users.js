var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
    firstName: {type: String, trim: true, index: true, default: null, sparse: true},
    lastName: {type: String, trim: true, index: true, default: null, sparse: true},
    password: {type: String, required: true},
    email: {type: String, trim: true, unique: true, index: true},
    accessToken: {type: String, trim: true, index: true, unique: true, sparse: true}
});
module.exports = mongoose.model('Users', Users);
