'use strict'
var _ = require('lodash');  

var controller = require('./controller');
var orderService = require('../../services/OrderService');
var consumerService = require('../../services/ConsumerService');
var workerService = require('../../services/WorkerService');
var positionService = require('../../services/PositionService');

angular.module('orderModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('OrderService', ['$http', orderService])
  .factory('WorkerService', ['$http', orderService])
  .factory('PositionService', ['$http', positionService])
  .controller('OrderCtrl', ['$scope', '$state', 'consumerList', 'orderList', 'positionList', 'workerList', 'OrderService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    consumerList: ['ConsumerService', function (ConsumerService) {
    return ConsumerService.all()
      .then(function(data) {
        return data;
      })
    }],
    orderList: ['OrderService', function (OrderService) {
    return OrderService.all()
      .then(function(data) {
        return data;
      })
    }],
    positionList: ['PositionService', function (PositionService) {
    return PositionService.all()
      .then(function(data) {
        return data;
      })
    }],
    workerList: ['WorkerService', function (WorkerService) {
    return WorkerService.all()
      .then(function(data) {
        return data;
      })
    }],
  },  
  controller: 'OrderCtrl'
};