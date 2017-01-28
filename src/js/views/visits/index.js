'use strict'
var _ = require('lodash');  

var controller = require('./controller');
var visitService = require('../../services/VisitService');

angular.module('visitModule', [])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  }])
  .factory('VisitService', ['$http', visitService])
  .controller('VisitCtrl', ['$scope', '$state', 'reportList', 'VisitService', controller]);

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
