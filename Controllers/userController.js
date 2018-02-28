'use strict';

const SERVICE  		= require('../Services/Master');
const ASYNC   		= require('async');
const CONTROLLERS 	= require('../controllers');
const CONFIG		= require('../config');
const TokenManager = require('../Lib').TokenManager;
const UniversalFunctions = require('../Utils/UniversalFunctions');

const createUser = async function(request, callback){
	var userData = {};
    try {
        request.payload.organisations = [request.auth.artifacts.organisationId];
        userData = await SERVICE.UserService.createUser(request.payload);
    } catch (err) {
        console.log("err===",err);
        throw err;
    }
    var criteria = {
        _id : request.auth.artifacts.organisationId
    };
    var setQuery = {
        $push: {
            users: [userData._id]
        }
    };
    var options = {};
    try {
        await SERVICE.OrganisationService.updateOrganisation(criteria, setQuery, options);
    } catch (err) {
        console.log("err=====",err);
        throw err;
    }
    return userData;
}

const loginUser = async function(payloadData, h){
    console.log("payloadData====",payloadData);
	var userData = {}, userFound = {}, successLogin = false, accessToken = null;
    try {
        var criteria = {
            email : payloadData.email
        };
        var projection = {};
        var option = {
            lean: true
        };
        var populateQuery = {
            path: 'organisations', select:"name dbName"
        }
        var result = await SERVICE.UserService.getPopulatesUser(criteria, projection, option, populateQuery);
        userFound = result && result[0] || null;
        console.log("userFound=====",userFound);
    } catch (err) {
        console.log("err=====",err);
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
    var organisationData = {};
    try {
        var dataToSave = {
            name : payloadData.organisationName
        }
        organisationData = await SERVICE.OrganisationService.createOrganisation(dataToSave);
    } catch (err) {
        throw err;
    }
    console.log("organisationData===",organisationData);

    var userData = {};
    payloadData.organisations = [organisationData._id];
    try {
        userData = await SERVICE.UserService.createUser(payloadData);
    } catch (err) {
        throw err;
    }
    console.log("userData===",userData);

    var criteria = {
        _id : organisationData._id
    };
    var setQuery = {
        $set: {
            dbName: 'org_' + organisationData._id,
            users: [userData._id]
        }
    };
    var options = {};
    try {
        await SERVICE.OrganisationService.updateOrganisation(criteria, setQuery, options);
    } catch (err) {
        console.log("err=====",err);
        throw err;
    }
    return userData;
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

const getUsers = async function(request){
    var userData = {};
    var criteria = {
        organisations : {
            $elemMatch : {
                $in : [request.auth.artifacts.organisationId]
            }
        }
    }
    try {
        userData = await SERVICE.UserService.getUser(criteria, {accessToken:!1, password:!1}, {});
    } catch (err) {
        console.log("err=====",err);
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
        userDetails = await SERVICE.UserService.getUser({_id: userId}, {accessToken:!1, password:!1}, {});
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
