var controller = require('./controller');
var mainService = require('../../../services/OrderService');
var consumerService = require('../../../services/ConsumerService');
var commodityService = require('../../../services/CommodityService');
var positionService = require('../../../services/PositionService');
var deliveryDaysService = require('../../../services/DeliveryPlanService');

angular.module('orderCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  
  .factory('MainService', ['$http', mainService])
  .factory('ConsumerService', ['$http', consumerService])
  .factory('CommodityService', ['$http', commodityService])
  .factory('PositionService', ['$http', positionService])
  .factory('DeliveryDaysService', ['$http', deliveryDaysService])

  .controller('CardCtrl', ['$scope', '$state', 'current', 'consumerList', 'commodityList', 'positionList', 'deliveryDaysList', 'MainService', controller])

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    current: ['MainService', function (MainService) {
     	return MainService.current();
    }],
    consumerList: ['ConsumerService', function (ConsumerService) {
    return ConsumerService.all()
      .then(function(data) {
        return data;
      })
    }],
    commodityList: ['CommodityService', function(CommodityService) {
    return CommodityService.all()
      .then(function(data) {
        return data;
      })
    }],
    deliveryDaysList: ['DeliveryDaysService', function(DeliveryDaysService) {
    return DeliveryDaysService.all()
      .then(function(data) {
        return data;
      })
    }],
    positionList: ['PositionService', 'MainService', function(PositionService, MainService) {
      var current = MainService.current();

      if (current) {
        return PositionService.byOrder(current.id)
          .then(function(data) {
            return data;
          })
      } else {
        return [];
      }
    }],   
  },
  controller: 'CardCtrl'
};