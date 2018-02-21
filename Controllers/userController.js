'use strict';

const SERVICE  		= require('../services');
const ASYNC   		= require('async');
const CONTROLLERS 	= require('../controllers');
const CONFIG		= require('../config');
const TokenManager = require('../Lib').TokenManager;
const UniversalFunctions = require('../Utils/UniversalFunctions');

const createUser = async function(payloadData, callback){
	var userData = {};
    try {
        userData = await SERVICE.UserService.createUser(payloadData);
    } catch (err) {
        throw err;
    }
    return payloadData;
}

const loginUser = async function(payloadData, h){
	var userData = {}, userFound = {}, successLogin = false, accessToken = null;
    try {
        var criteria = {
            email : payloadData.email
        };
        var projection = {};
        var option = {
            lean: true
        };
        var result = await SERVICE.UserService.getUser(criteria, projection, option);
        userFound = result && result[0] || null;
    } catch (err) {
        return h.internalError(err);
    }

    if (!userFound) {
        throw await CONFIG.CONSTANTS.STATUS_MSG.ERROR.INVALID_USER_PASS;
    } else {
        if (userFound && userFound.password != payloadData.password) {
            throw await CONFIG.CONSTANTS.STATUS_MSG.ERROR.INCORRECT_PASSWORD;
        } else {
            successLogin = true;
        }
    }

    if (successLogin) {
        try {
            var tokenData = {
                id: userFound._id
            };
            var output = await TokenManager.setToken(tokenData);
        } catch (err) {
            throw err;
        }

        if (output && output.accessToken){
            accessToken = output && output.accessToken;
        }else {
            throw CONFIG.CONSTANTS.ERROR.IMP_ERROR;
        }

        return {accessToken: accessToken, userDetails: UniversalFunctions.deleteUnnecessaryUserData(userFound)};
    } else {
        throw CONFIG.CONSTANTS.ERROR.IMP_ERROR;
    }
}

const signUp = async function(payloadData, callback){
    var userData = {};
    try {
        userData = await SERVICE.UserService.createUser(payloadData);
    } catch (err) {
        throw err;
    }
    return payloadData;
}

const logout = async function(userData) {
    console.log("userData========",userData);
    var criteria = {
        _id: userData.id
    };
    var setQuery = {
        $unset: {
            accessToken: 1
        }
    };
    var options = {};
    try {
        await SERVICE.UserService.updateUser(criteria, setQuery, options);
    } catch (err) {
        console.log("err=====",err);
        throw err;
    }
    return {};
}

const getUsers = async function(){
    var userData = {};
    try {
        userData = await SERVICE.UserService.getUser({}, {accessToken:!1}, {});
    } catch (err) {
        throw err;
    }
    return userData;
}

const getUserDetails = async function(userData, userId){
    if(userData.id != userId){
        throw CONFIG.CONSTANTS.ERROR.INVALID_ID;
    }
    var userDetails = {};
    try {
        userDetails = await SERVICE.UserService.getUser({_id: userId}, {accessToken:!1}, {});
    } catch (err) {
        throw err;
    }
    return userDetails[0];
}

module.exports = {
    createUser:createUser,
    loginUser:loginUser,
    signUp: signUp,
    logout: logout,
    getUsers: getUsers,
    getUserDetails: getUserDetails
};
