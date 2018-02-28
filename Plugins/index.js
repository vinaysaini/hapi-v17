module.exports = [
	{ register: require('./swagger').register, 'name': 'swagger-plugin'},
	{ register: require('./organisation-check').register, 'name': 'organisation-check'},
	{ register: require('./auth-token').register, 'name': 'auth-token-plugin'},
];