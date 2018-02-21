'use strict';

var TokenManager = require('../Lib/TokenManager');

exports.register = async function(server, options){
    //Register Authorization Plugin

    await server.register(require('hapi-auth-bearer-token'));

    server.auth.strategy('UserAuth', 'bearer-access-token', {
        allowQueryToken: false,              
        allowMultipleHeaders: true,
        accessTokenName: 'accessToken',
        validate: async (request, token, h) => {
            try {
                var response = await TokenManager.verifyToken(token);
            } catch (err) {
                isValid = false;
                artifacts = {};
            }
            if (response && response.userData) {
                var isValid = true;
                var artifacts = { userData: response.userData };
            } else {
                isValid = false;
                artifacts = {};
            }
            var credentials = { token };
            return { isValid, credentials, artifacts };
        }
    });
};
