'use strict';

var Models = require('../../Models/Master');


//Insert User in DB
var createUser = async function (objToSave) {
    return await new Models.Users(objToSave).save();
};

//Get Users from DB
var getUser = async function (criteria, projection, options) {
    options.lean = true;
    return await Models.Users.find(criteria, projection, options);
};

//Update User in DB
var updateUser = async function (criteria, dataToSet, options) {
    options.lean = true;
    options.new = true;
    return await Models.Users.findOneAndUpdate(criteria, dataToSet, options);
};

var getPopulatesUser = async function (query, projection, option, populateQuery) {
	return await Models.Users.find(query, projection, option).populate(populateQuery).exec();
};

module.exports = {
	createUser: createUser,
	getUser: getUser,
    updateUser: updateUser,
    getPopulatesUser: getPopulatesUser
};