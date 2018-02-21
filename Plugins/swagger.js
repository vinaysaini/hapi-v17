//Register Swagger
const swaggerOptions = {
    info: {
        title: 'Backend API Documentation',
        version: "1",
    }
};

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

exports.register = async function(server, options){

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
}
