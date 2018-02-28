'use strict';
var UserRoute = require('./UserRoute');
var BotRoute = require('./BotRoute');

var all = [].concat(UserRoute, BotRoute);

module.exports = all;

