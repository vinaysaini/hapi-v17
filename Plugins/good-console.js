'use strict';
var Good = require('good');

//Register Good Console

exports.register = async function(server, options){

    await server.register({
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    });
};