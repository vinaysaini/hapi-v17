'use strict';
var Config = require('../Config');
var Jwt = require('jsonwebtoken');
var async = require('async');
var Service = require('../Services');


var setToken = async function (tokenData) {
    if (!tokenData.id) {
        return Config.CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR;
    } else {
        var tokenToSend = Jwt.sign(tokenData, Config.CONSTANTS.SERVER.JWT_SECRET_KEY);
        await setTokenInDB(tokenData.id, tokenToSend);
        return {accessToken: tokenToSend};
    }
};

var setTokenInDB = async function (userId, tokenToSave, callback) {
    var criteria = {
        _id: userId
    };
    var setQuery = {
        accessToken : tokenToSave
    };

    try {
        var dataAry = await Service.UserService.updateUser(criteria, setQuery, {new:true});
    } catch(err) {
        throw err;
    }
    if (dataAry && dataAry._id){
    }else {
        return Config.CONSTANTS.STATUS_MSG.ERROR.IMP_ERROR;
    }

    return ; 
};

var verifyToken = async function (token) {
    var response = {
        valid: false
    };
    try {
        var decoded = await Jwt.verify(token, Config.CONSTANTS.SERVER.JWT_SECRET_KEY);
    } catch (err) {
        throw err;
    }
    try {
        var userData = await getTokenFromDB(decoded.id, decoded.type, token);
    } catch (err) {
        throw err;
    }
    return userData;
};

var getTokenFromDB = async function (userId, userType, token) {
    var userData = null;
    var criteria = {
        _id: userId,
        accessToken : token
    };
    try {
        var dataAry = await Service.UserService.getUser(criteria,{},{lean:true});
    } catch (err) {
        throw err;
    }
    if (dataAry && dataAry.length > 0){
        userData = dataAry[0];
    }else {
        throw Config.APP_CONSTANTS.STATUS_MSG.ERROR.INVALID_TOKEN;
    }
    if (userData && userData._id){
        userData.id = userData._id;
    }
    return {userData: userData};
};



module.exports = {
    setToken: setToken,
    verifyToken: verifyToken
};