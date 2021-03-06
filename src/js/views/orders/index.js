'use strict'
var _ = require('lodash');
require('angular-flash-alert');  

var controller = require('./controller');
var orderService = require('../../services/OrderService');
var consumerService = require('../../services/ConsumerService');

angular.module('orderModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })
  .factory('ConsumerService', ['$http', consumerService])
  .factory('OrderService', ['$http', orderService])
  .controller('OrderCtrl', ['$scope', '$state', 'consumersList', 'ordersList', 'Flash', 'OrderService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    consumersList: ['ConsumerService', function (ConsumerService) {
    return ConsumerService.all()
      .then(function(data) {
        return data;
      })
    }],
    ordersList: ['OrderService', function (OrderService) {
    return OrderService.allDetailed()
      .then(function(data) {
        return data;
      })
    }],
  },  
  controller: 'OrderCtrl'
};
