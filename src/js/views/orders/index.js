'use strict'

var controller = require('./controller');
var commodityService = require('../../services/CommodityService');

angular.module('commodityModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('CommodityService', ['$http', commodityService])
  .controller('CommodityCtrl', ['$scope', '$state', 'CommodityService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  controller: 'CommodityCtrl'
};