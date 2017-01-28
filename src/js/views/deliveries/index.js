'use strict'
var _ = require('lodash');  

var controller = require('./controller');
var positionService = require('../../services/PositionService');
var orderService = require('../../services/OrderService');

angular.module('deliveryModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('PositionService', ['$http', positionService])
  .factory('OrderService', ['$http', orderService])
  .controller('DeliveryCtrl', ['$scope', '$state', 'ordersList', 'OrderService', 'PositionService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    // positionsList: ['PositionService', function (PositionService) {
    // return PositionService.notDelivered()
    //   .then(function(data) {
    //     return data;
    //   })
    // }],
    ordersList: ['OrderService', function (OrderService) {
    return OrderService.allNotDeliveredYet()
      .then(function(data) {
        return data;
      })
    }],
  },  
  controller: 'DeliveryCtrl'
};
