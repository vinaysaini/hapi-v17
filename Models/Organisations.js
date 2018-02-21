var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Organisations = new Schema({
    name: {type: String, trim: true, index: true, required: true, default: null, sparse: true},
    dbName: {type: String, trim: true, index: true, required: true, default: null, sparse: true}
});
module.exports = mongoose.model('Organisations', Organisations);
