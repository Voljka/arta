var controller = require('./controller');
var visitService = require('../../../services/VisitService');
var consumerService = require('../../../services/ConsumerService');
var regionService = require('../../../services/RegionService');
var planService = require('../../../services/DeliveryPlanService');

//require('angular-ui-notification')
require('angular-flash-alert');

// angular.module('visitCardModule', ['ui-notification'])
angular.module('visitCardModule', ['ngFlash'])
  
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })
  
  // .config(function(NotificationProvider) {
  //     NotificationProvider.setOptions({
  //         delay: 5000,
  //         // startTop: 20,
  //         // startRight: 10,
  //         // verticalSpacing: 20,
  //         // horizontalSpacing: 20,
  //         // positionX: 'right',
  //         // positionY: 'top',
  //         priority: 100
  //     });
  // })

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  
  .factory('VisitService', ['$http', visitService])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('RegionService', ['$http', regionService])
  .factory('DeliveryPlanService', ['$http', planService])

  // .controller('visitCardCtrl', ['$scope', '$state', 'consumerList', 'reportList', 'visitList', 'regionList', 'planList', 'VisitService', 'Notification', controller])
  .controller('visitCardCtrl', ['$scope', '$state', 'consumerList', 'reportList', 'visitList', 'regionList', 'planList', 'VisitService', 'Flash', controller])

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    consumerList: ['ConsumerService', function (ConsumerService) {
    return ConsumerService.all()
      .then(function(data) {
        return data;
      })
    }],
    reportList: ['VisitService', function (VisitService) {
    return VisitService.allReports()
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
    planList: ['DeliveryPlanService', function (DeliveryPlanService) {
    return DeliveryPlanService.all()
      .then(function(data) {
        return data;
      })
    }],
    visitList: ['VisitService', function (VisitService) {
      if (VisitService.currentReport()) {
        return VisitService.allVisits(VisitService.currentReport().id)
          .then(function(data) {
            return data;
          })
      } else {
        return [];
      }
    }],
  },
  controller: 'visitCardCtrl'
};
