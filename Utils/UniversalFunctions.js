'use strict';
var Boom = require('boom');
var CONFIG = require('../Config');
var Joi = require('joi');



var failActionFunction = function (request, reply, error) {
    var customErrorMessage = '';
    if (error.output.payload.message.indexOf("[") > -1) {
        customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf("["));
    } else {
        customErrorMessage = error.output.payload.message;
    }
    customErrorMessage = customErrorMessage.replace(/"/g, '');
    customErrorMessage = customErrorMessage.replace('[', '');
    customErrorMessage = customErrorMessage.replace(']', '');
    error.output.payload.message = customErrorMessage;
    delete error.output.payload.validation
    return error;
};

var sendError = function (data) {
    //console.trace('ERROR OCCURED ', data)
    if (typeof data == 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
        console.log('attaching resposnetype',data.type)
        var errorToSend = new Boom(data.customMessage,{statusCode: data.statusCode});
        errorToSend.output.payload.responseType = data.type;
        return errorToSend.output;
    } else {
        var errorToSend = '';
        if (typeof data == 'object') {
            if (data.name == 'BulkWriteError') {
                errorToSend += CONFIG.CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage;
                if (data.code = 11000) {
                    var duplicateValue = data.errmsg && data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
                    duplicateValue = duplicateValue.replace('}','');
                    errorToSend += CONFIG.CONSTANTS.STATUS_MSG.ERROR.DUPLICATE.customMessage + " : " + duplicateValue;
                }
            } else if (data.name == 'ApplicationError') {
                errorToSend += CONFIG.CONSTANTS.STATUS_MSG.ERROR.APP_ERROR.customMessage + ' : ';
            } else if (data.name == 'ValidationError') {
                errorToSend += CONFIG.CONSTANTS.STATUS_MSG.ERROR.APP_ERROR.customMessage + data.message;
            } else if (data.name == 'CastError') {
                errorToSend += CONFIG.CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage + CONFIG.CONSTANTS.STATUS_MSG.ERROR.INVALID_ID.customMessage + data.value;
            }
        } else {
            errorToSend = data
        }
        console.log("errorToSend======",errorToSend)

        var customErrorMessage = errorToSend;
        if (typeof customErrorMessage == 'string'){
            if (errorToSend.indexOf("[") > -1) {
                customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
            }
            customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
            customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');
        }
        console.log("customErrorMessage======",customErrorMessage)

        var customErrorMessageToSend = new Boom(customErrorMessage,{statusCode: 400});
        console.log("customErrorMessageToSend====",customErrorMessageToSend);
        return customErrorMessageToSend.output;
    }
};

var sendSuccess = function (successMsg, data) {
    successMsg = successMsg || CONFIG.CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT.customMessage;
    if (typeof successMsg == 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')) {
        return {statusCode:successMsg.statusCode, message: successMsg.customMessage, data: data || null};

    }else {
        return {statusCode:200, message: successMsg, data: data || null};
    }
};

var deleteUnnecessaryUserData = function (userObj) {
    console.log('deleting>>',userObj)
    delete userObj['__v'];
    delete userObj['password'];
    delete userObj['accessToken'];
    console.log('deleted',userObj)
    return userObj;
};

var authorizationHeaderObj = Joi.object({
    authorization: Joi.string().required()
}).unknown();

module.exports = {
    failActionFunction: failActionFunction,
    sendError: sendError,
    sendSuccess: sendSuccess,
    deleteUnnecessaryUserData: deleteUnnecessaryUserData,
    authorizationHeaderObj: authorizationHeaderObj
};