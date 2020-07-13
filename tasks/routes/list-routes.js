var allRoutes = require('express-list-endpoints');

var app = require('../../app');

console.log(allRoutes(app));
