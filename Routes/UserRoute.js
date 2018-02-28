 'use strict';
var Controller = require('../Controllers');
var CONFIG = require('../Config');
var UniversalFunctions = require('../Utils/UniversalFunctions');
var Joi = require('joi');

module.exports = [
	{
	    method: 'POST',
	    path: '/api/user',
	    handler: async function (request, h) {
	        try {
                var data = await Controller.UserController.createUser(request);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
	    },
	    config: {
	        description: 'Create User',
	        tags: ['api', 'user'],
            auth: 'UserAuth',
	        validate: {
	            payload: {
	            	firstName: Joi.string().required(),
	            	lastName: Joi.string().required(),
	                email: Joi.string().email().required(),
	                password: Joi.string().required()
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
        method: 'POST',
        path: '/api/user/login',
        handler: async function (request, h) {
            try {
                var data = await Controller.UserController.loginUser(request.payload);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'Login Via Email & Password For User',
            tags: ['api', 'user'],
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().required().min(5).trim(),
                },
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
        method: 'POST',
        path: '/api/user/signUp',
        handler: async function (request, h) {
            try {
                var data = await Controller.UserController.signUp(request.payload);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                console.log("err=========",err);
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'SignUp user',
            tags: ['api', 'user'],
            validate: {
                payload: {
                    firstName: Joi.string().required(),
                    lastName: Joi.string().required(),
                    email: Joi.string().email().required(),
                    organisationName: Joi.string().required(),
                    password: Joi.string().required().min(5).trim(),
                },
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
        method: 'PUT',
        path: '/api/user/logout',
        handler: async function (request, h) {
            var token = request.auth.credentials.token;
            var userData = request.auth.artifacts.userData;
            try {
                var data = await Controller.UserController.logout(userData);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'user',
            tags: ['api', 'user'],
            auth: 'UserAuth',
            validate: {
                headers: UniversalFunctions.authorizationHeaderObj,
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
        path: '/api/user',
        handler: async function (request, h) {
            try {
                var data = await Controller.UserController.getUsers(request);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'user',
            tags: ['api', 'user'],
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
    },
    {
        method: 'GET',
        path: '/api/user/{id}',
        handler: async function (request, h) {
            var userData = request.auth.artifacts.userData;
            var userId = request.params.id;
            try {
                var data = await Controller.UserController.getUserDetails(userData, userId);
                return UniversalFunctions.sendSuccess(null, data);
            } catch (err) {
                var errorResponse = UniversalFunctions.sendError(err);
                return h.response(errorResponse).code(errorResponse.statusCode);
            }
        },
        config: {
            description: 'user',
            tags: ['api', 'user'],
            auth: 'UserAuth',
            validate: {
                 params: {
                    id : Joi.string().required()
                },
                headers: UniversalFunctions.authorizationHeaderObj,
                failAction: UniversalFunctions.failActionFunction
            },
            plugins: {
                'hapi-swagger': {
                    responseMessages: CONFIG.CONSTANTS.swaggerDefaultResponseMessages
                }
            }
        }
    }
];