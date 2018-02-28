'use strict';
var Controller = require('../Controllers');
var CONFIG = require('../Config');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var Joi = require('joi');

module.exports = [
	{
	    method: 'POST',
	    path: '/api/bot',
	    handler: async function (request, h) {
	        try {
                var data = await Controller.BotController.createBot(request);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
	    },
	    config: {
	        description: 'Create Bot',
	        tags: ['api', 'bot'],
            auth: 'UserAuth',
	        validate: {
	            payload: {
	            	name: Joi.string().required(),
	            	domain: Joi.string().required(),
	            },
                headers: UniversalFunctions.tenantAuthorizationHeaderObj,
	            failAction: UniversalFunctions.failActionFunction
	        },
	        plugins: {
	            'hapi-swagger': {
	                responseMessages: CONFIG.CONSTANTS.swaggerDefaultResponseMessages
	            }
	        }
	    }
	},
    {
        method: 'GET',
        path: '/api/bot',
        handler: async function (request, h) {
            var organisationId = request.headers.organisation;
            try {
                var data = await Controller.BotController.getBots(request);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                console.log("err===",err);
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'bot',
            tags: ['api', 'bot'],
            auth: 'UserAuth',
            validate: {
                headers: UniversalFunctions.tenantAuthorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: CONFIG.CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    }
    // {
    //     method: 'GET',
    //     path: '/api/bot/{id}',
    //     handler: async function (request, h) {
    //         var botData = request.auth.artifacts.userData;
    //         console.log("request===",request);
    //         var userId = request.params.id;
    //         try {
    //             var data = await Controller.UserController.getUserDetails(userData, userId);
    //             return UniversalFunctions.sendSuccess(null, data);
    //         } catch (err) {
    //             var errorResponse = UniversalFunctions.sendError(err);
    //             return h.response(errorResponse).code(errorResponse.statusCode);
    //         }
    //     },
    //     config: {
    //         description: 'user',
    //         tags: ['api', 'user'],
    //         auth: 'UserAuth',
    //         validate: {
    //              params: {
    //                 id : Joi.string().required()
    //             },
    //             headers: UniversalFunctions.authorizationHeaderObj,
    //             failAction: UniversalFunctions.failActionFunction
    //         },
    //         plugins: {
    //             'hapi-swagger': {
    //                 responseMessages: CONFIG.CONSTANTS.swaggerDefaultResponseMessages
    //             }
    //         }
    //     }
    // }
];