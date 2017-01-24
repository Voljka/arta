var controller = require('./controller');
var commodityService = require('../../../services/CommodityService');

angular.module('commodityCardModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('CommodityService', ['$http', commodityService])
  .controller('CommodityCardCtrl', ['$scope', '$state', 'CommodityService', 'currentCommodity', controller])
  .directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
  }])

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    currentCommodity: ['CommodityService', function (CommodityService) {
     	return CommodityService.current();
    }]
  },
  controller: 'CommodityCardCtrl'
};
