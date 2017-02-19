

// libraries
require('expose-loader?$!jquery'); // Globally expose Jquery
require('./lib/foundation.min');
require('./lib/owl.carousel-2');
// require('./lib/modernizr-custom');
require('./lib/velocity.min');

// base object
var nameOfProject = {};

// settings
var SITE_SETTINGS = require('./settings/settings.global-settings');

// components
var exampleModule = require('./modules/module.example');

var test = new exampleModule();




