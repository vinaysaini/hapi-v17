'use strict';
const SERVICE  		= require('../Services/Master');
const CONFIG 		= require('../Config');
const UniversalFunctions = require('../Utils/UniversalFunctions')

exports.register = async function(server, options){

    //console.log("server===",server);
    server.ext('onRequest', async function(request, h) {
    	if (request.headers.organisation) {
    		if(UniversalFunctions.checkObjectId(request.headers.organisation)){
    			var criteria = {
			        accessToken : request.headers.authorization.replace('bearer ',''),
			        organisations : {
			        	$elemMatch :{
			        		$in : [request.headers.organisation]
			        	}
			        }
			    };
			    try {
			        var dataAry = await SERVICE.UserService.getUser(criteria,{},{lean:true});
			    } catch (err) {
			        throw err;
			    }
			    if (dataAry && dataAry.length > 0) {
			    	return h.continue;
			    } else {
			    	return h.response(CONFIG.CONSTANTS.STATUS_MSG.ERROR.ACCESS_DENIED).code(401).takeover();
			    }
    		} else {
    			return h.response(CONFIG.CONSTANTS.STATUS_MSG.ERROR.ACCESS_DENIED).code(401).takeover();
    		}
    	} else {
    		return h.continue;
    	}
    });
}

