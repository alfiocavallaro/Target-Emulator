var express = require('express');

var MyAirCond = require('./SmartObject/MyAirCond');
var MyFan = require('./SmartObject/MyFan');
var MyHeater = require('./SmartObject/MyHeater');
var MySmartTV1 = require('./SmartObject/MySmartTV1');
var MySmartTV2 = require('./SmartObject/MySmartTV2');
var MyStereo = require('./SmartObject/MyStereo');
var MyThermometer = require('./SmartObject/MyThermometer');

// Create our Express application
var app = express(); 

// Set view engine to ejs
app.set('view engine', 'ejs');

// Use environment defined port or 4000
var port = process.env.PORT || 4000;

// Create our Express router
var router = express.Router();

router.route('/MyFan').get(MyFan.get);
router.route('/MyAirCond').get(MyAirCond.get);
router.route('/MyHeater').get(MyHeater.get);
router.route('/MyStereo').get(MyStereo.get);
router.route('/MySmartTV1').get(MySmartTV1.get);
router.route('/MySmartTV2').get(MySmartTV2.get);
router.route('/MyThermometer').get(MyThermometer.get);

// Register all our routes with /api
app.use('/', router);

// Start the server
app.listen(port);
console.log('Target Block on port ' + port);