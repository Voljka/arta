'use strict'
var _ = require('lodash');  

var controller = require('./controller');
var orderService = require('../../services/OrderService');
var consumerService = require('../../services/ConsumerService');

angular.module('orderModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('OrderService', ['$http', orderService])
  .controller('OrderCtrl', ['$scope', '$state', 'consumersList', 'ordersList', 'OrderService', controller]);

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
