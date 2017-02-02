'use strict'
var _ = require('lodash'); 
require('angular-flash-alert');

var controller = require('./controller');
var positionService = require('../../services/PositionService');
var orderService = require('../../services/OrderService');

angular.module('deliveryModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })

  .factory('PositionService', ['$http', positionService])
  .factory('OrderService', ['$http', orderService])
  .controller('DeliveryCtrl', ['$scope', '$state', 'ordersList', 'OrderService', 'Flash','PositionService', controller]);

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
