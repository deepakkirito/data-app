const dataRoutes = require('express').Router();
const dataControllers = require('../Controller/api-controller.js');
const verifyParams = require('../Verification/api-verify');

dataRoutes.get('/', verifyParams, dataControllers.sendData);

dataRoutes.post('/', dataControllers.getData);

dataRoutes.put('/', dataControllers.updateData);

module.exports = dataRoutes;