var controller = require('./controller');
var consumerService = require('../../services/ConsumerService');
var regionService = require('../../services/RegionService');

require('angular-flash-alert');

require('angular-drag-and-drop-lists');

angular.module('routingModule', ['dndLists', 'ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])

  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })

  .factory('ConsumerService', ['$http', consumerService])
  .factory('RegionService', ['$http', regionService])

  .controller('RoutingCtrl', ['$scope', '$state', 'consumerList', 'regionList', 'Flash', 'ConsumerService',controller])

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    consumerList: ['ConsumerService', function (ConsumerService) {
    return ConsumerService.all()
      .then(function(data) {
        return data;
      })
    }],
    regionList: ['RegionService', function (RegionService) {
    return RegionService.all()
      .then(function(data) {
        return data;
      })
    }],
  },
  controller: 'RoutingCtrl'
};