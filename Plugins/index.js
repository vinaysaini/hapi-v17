module.exports = [
	{ register: require('./swagger').register, 'name': 'swagger-plugin'},
	{ register: require('./auth-token').register, 'name': 'auth-token-plugin'}
];