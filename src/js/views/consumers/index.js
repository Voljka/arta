'use strict'

var controller = require('./controller');
var consumerService = require('../../services/ConsumerService');
var regionService = require('../../services/RegionService');
var workerService = require('../../services/WorkerService');

angular.module('consumerModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('RegionService', ['$http', regionService])
  .factory('WorkerService', ['$http', workerService])
  .controller('ConsumerCtrl', ['$scope', '$state', 'consumerList', 'regionList', 'workerList', 'ConsumerService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    consumerList: ['ConsumerService', function (ConsumerService) {
  		return ConsumerService.all()
  			.then(function(data) {
  				return data;
  			})
    }],
    regionList: ['RegionService', function(RegionService) {
  		return RegionService.all()
  			.then(function(data) {
  				return data;
  			})
    }],
    workerList: ['WorkerService', function (WorkerService) {
      return WorkerService.all()
        .then(function(data) {
          return data;
        })
    }]
  },  
  controller: 'ConsumerCtrl'
};