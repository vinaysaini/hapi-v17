var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersOrganisations = new Schema({
    userId: { type: Schema.ObjectId, ref: 'Users', required: true},
    organisationId: { type: Schema.ObjectId, ref: 'Organisations', required: true}
});
module.exports = mongoose.model('UsersOrganisations', UsersOrganisations);
