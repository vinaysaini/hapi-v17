'use strict';

//External Dependencies
var Hapi = require('hapi');

//Internal Dependencies
//var Config = require('./Config');
var Routes = require('./Routes');
var Plugins = require('./Plugins');
var Bootstrap = require('./Utils/BootStrap');



(async function main() {
    // create new server instance and connection information
    const server = await new Hapi.Server({  
      host: 'localhost',
      port: 3000
    });

    //Register All Plugins
    await server.register(Plugins);

    //Start Server
    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
    } catch(err) {
        console.log(err);
    }

    //API Routes
    server.route(Routes);
})();


