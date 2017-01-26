'use strict'

var controller = require('./controller');
var consumerService = require('../../../services/ConsumerService');
var regionService = require('../../../services/RegionService');
var workerService = require('../../../services/WorkerService');

angular.module('consumerCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('RegionService', ['$http', regionService])
  .factory('WorkerService', ['$http', workerService])
  .controller('ConsumerCardCtrl', ['$scope', '$state', 'workerList', 'regionList', 'current', 'ConsumerService', controller])

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    current: ['ConsumerService', function (ConsumerService) {
      console.log('current in Index');
      console.log(ConsumerService.current())
     	return ConsumerService.current();
    }],
    workerList: ['WorkerService', function (WorkerService) {
    return WorkerService.all()
      .then(function(data) {
        return data;
      })
    }],
    regionList: ['RegionService', function(RegionService) {
    return RegionService.all()
      .then(function(data) {
        return data;
      })
    }]    
  },
  controller: 'ConsumerCardCtrl'
};
