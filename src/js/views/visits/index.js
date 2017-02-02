'use strict'
var _ = require('lodash');  
require('angular-flash-alert');

var controller = require('./controller');
var visitService = require('../../services/VisitService');

angular.module('visitModule', ['ngFlash'])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .config((FlashProvider) => {
      FlashProvider.setTimeout(5000);
      FlashProvider.setShowClose(true);
  })

  .factory('VisitService', ['$http', visitService])
  .controller('VisitCtrl', ['$scope', '$state', 'reportList', 'Flash', 'VisitService', controller]);

module.exports = {
  template: require('./template.tpl'), 
  resolve: {
    reportList: ['VisitService', function (VisitService) {
    return VisitService.allReports()
      .then(function(data) {
        return data;
      })
    }],
  },  
  controller: 'VisitCtrl'
};
