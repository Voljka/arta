var controller = require('./controller');
var mainService = require('../../../services/ConsumerService');
var regionService = require('../../../services/RegionService');
var workerService = require('../../../services/WorkerService');

angular.module('consumerCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('MainService', ['$http', mainService])
  .factory('RegionService', ['$http', regionService])
  .factory('WorkerService', ['$http', workerService])
  .controller('CardCtrl', ['$scope', '$state', 'MainService', 'workerList', 'regionList', 'current', controller])

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    current: ['MainService', function (MainService) {
     	return MainService.current();
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
  controller: 'CardCtrl'
};
