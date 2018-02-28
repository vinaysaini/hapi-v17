'use strict';

const SERVICE  		= require('../Services/Tenant');
const ASYNC   		= require('async');
const CONTROLLERS 	= require('../controllers');
const CONFIG		= require('../config');
const TokenManager = require('../Lib').TokenManager;
const UniversalFunctions = require('../Utils/UniversalFunctions');

const createBot = async function(request){
	var botData = {};
    try {
        botData = await SERVICE.BotService.createBot(request.auth.artifacts.organisationId, request.payload);
    } catch (err) {
        throw err;
    }
    return botData;
}

const getBots = async function(request){
    var botData = {};
    try {
        botData = await SERVICE.BotService.getBot(request.auth.artifacts.organisationId, {}, {}, {});
    } catch (err) {
        throw err;
    }
    return botData;
}

const getBotDetails = async function(artifacts, botData, botId){
    // if(userData.id != userId){
    //     throw CONFIG.CONSTANTS.ERROR.INVALID_ID;
    // }
    var botDetails = {};
    try {
        botDetails = await SERVICE.BotService.getBot({_id: botId}, {}, {});
    } catch (err) {
        throw err;
    }
    return botDetails[0];
}

module.exports = {
    createBot:createBot,
    getBots:getBots,
    getBotDetails: getBotDetails
};
