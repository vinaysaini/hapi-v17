'use strict';
var CONFIG = require('../Config');
var mongoose = require('mongoose');
var Models = require('../Models/Tenant')

var connections = {};

var getDB = async function (dbName) {
    if(connections[dbName]) {
        //database connection already exist. Return connection object
        return connections[dbName];
    } else {
        connections[dbName] = await mongoose.createConnection(CONFIG.dbConfig.tenant.URI + ':' + CONFIG.dbConfig.tenant.port + '/' + dbName);
        return connections[dbName];
    }       
};

var getModel = async function (organisationId, model_name) {
    var db = await getDB("org_" + organisationId);
    return db.model(model_name, Models[model_name]);      
};

module.exports = {
    getDB: getDB,
    getModel: getModel
};