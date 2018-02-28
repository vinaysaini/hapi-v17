var swaggerDefaultResponseMessages = [
    {code: 200, message: 'OK'},
    {code: 400, message: 'Bad Request'},
    {code: 401, message: 'Unauthorized'},
    {code: 404, message: 'Data Not Found'},
    {code: 500, message: 'Internal Server Error'}
];

var SERVER = {
    JWT_SECRET_KEY: "'sUPerSeCuR&T^^&&*#^^#348723t4872t34Ends'"
}

var STATUS_MSG = {
    ERROR: {
        INVALID_USER_PASS: {
            statusCode:401,
            type: 'INVALID_USER_PASS',
            customMessage : 'Invalid username or password'
        },
        INCORRECT_PASSWORD: {
            statusCode:401,
            customMessage : 'Incorrect Password',
            type : 'INCORRECT_PASSWORD'
        },
        ACCESS_DENIED: {
            statusCode:401,
            customMessage : 'You do not have permission for this organisation',
            type : 'ACCESS_DENIED'
        },
        DUPLICATE: {
            statusCode:400,
            customMessage : 'Duplicate Entry',
            type : 'DUPLICATE'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error : ',
            type : 'DB_ERROR'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error : ',
            type : 'DB_ERROR'
        },
        INVALID_ID: {
            statusCode:400,
            customMessage : 'Invalid Id Provided : ',
            type : 'INVALID_ID'
        },
        APP_ERROR: {
            statusCode:400,
            customMessage : 'Application Error',
            type : 'APP_ERROR'
        },
        IMP_ERROR: {
            statusCode:500,
            customMessage : 'Implementation Error',
            type : 'IMP_ERROR'
        },
        INVALID_TOKEN: {
            statusCode:401,
            customMessage : 'Invalid token provided',
            type : 'INVALID_TOKEN'
        }
            
    },
    SUCCESS: {
        CREATED: {
            statusCode:201,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        }
    }
}

var CONSTANTS = {
    SERVER: SERVER,
	STATUS_MSG: STATUS_MSG,
    swaggerDefaultResponseMessages: swaggerDefaultResponseMessages
};

module.exports = CONSTANTS;