'use strict';

var Models = require('../../Models/Master');


//Insert User in DB
var createOrganisation = async function (objToSave) {
    return await new Models.Organisations(objToSave).save();
};

//Get Users from DB
var getOrganisation = async function (criteria, projection, options) {
    options.lean = true;
    return await Models.Organisations.find(criteria, projection, options);
};

//Update User in DB
var updateOrganisation = async function (criteria, dataToSet, options) {
    options.lean = true;
    options.new = true;
    return await Models.Organisations.findOneAndUpdate(criteria, dataToSet, options);
};

module.exports = {
	createOrganisation: createOrganisation,
	getOrganisation: getOrganisation,
    updateOrganisation: updateOrganisation
};