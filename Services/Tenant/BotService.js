'use strict';

var Models = require('../../Models/Tenant').Bots;
var DBManager = require('../../Lib').DBManager;
var MODEL_NAME = 'Bots';

//Insert User in DB
var createBot = async function (organisationId, objToSave) {
    var Bots = await DBManager.getModel(organisationId, MODEL_NAME);
    return await Bots(objToSave).save();
};

//Get Users from DB
var getBot = async function (organisationId, criteria, projection, options) {
    var Bots = await DBManager.getModel(organisationId, MODEL_NAME);
    options.lean = true;
    return await Bots.find(criteria, projection, options);
};

//Update User in DB
var updateBot = async function (organisationId, criteria, dataToSet, options) {
    options.lean = true;
    options.new = true;
    return await Models.Bots.findOneAndUpdate(criteria, dataToSet, options);
};

var getPopulatesBot = async function (query, projection, option, populateQuery) {
	return await Models.Bots.find(query, projection, option).populate(populateQuery).exec();
};

module.exports = {
	createBot: createBot,
	getBot: getBot,
    updateBot: updateBot,
    getPopulatesBot: getPopulatesBot
};