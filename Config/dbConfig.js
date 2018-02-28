'use strict';

var mongoURL = "mongodb://localhost/ktl-master-backend";
var mongo = {
    URI: mongoURL,
    port: 27017
};

var TenantURL = "mongodb://localhost"
var tenant = {
    URI: TenantURL,
    port: 27017
};


module.exports = {
    mongo: mongo,
    tenant: tenant
};