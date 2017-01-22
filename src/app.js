var angular = require('angular');
require('angular-route');
require('angular-ui-router');

var commodityTemplate = require('./js/views/commodities');
// var consumersTemplate = require('./js/pages/consumers');
// var consumersCardTemplate = require('./js/pages/consumers/card');
// var providersTemplate = require('./js/pages/providers');
// var mediatorsTemplate = require('./js/pages/mediators');
// var summariesTemplate = require('./js/pages/summaries');
// var directoriesTemplate = require('./js/pages/directories');

var app = angular
	.module('artaApp', [
		'ui.router', 
		'ngRoute', 
		'commodityModule',
		// 'consumerCardModule'
	])

	.controller('MainCtrl', function($scope) {
		$scope.temporal_variable = 'Ok';
	})

	.config(function($stateProvider, $urlRouterProvider) {
    
    	$urlRouterProvider.otherwise('/commodities');
    
    	$stateProvider
	        .state('commodities', {
	            url: '/commodities',
	            views: {
	            	'content': commodityTemplate
	            }
	        })

// 	        .state('consumers', {
// 	            url: '/consumers',
// 	            views: {
// 	            	'content': consumersTemplate
// 	            }
// 	        })
// 	        .state('consumer_add', {
// 	            url: '/consumer/new',
// 	            views: {
// 	            	'content': consumersCardTemplate
// 	            }
// 	        })
// 	        .state('consumer_modify', {
// 	            url: '/consumer/modify',
// 	            views: {
// 	            	'content': consumersCardTemplate
// 	            }
// 	        })
// 	        .state('providers', {
// 	            url: '/providers',
// 	            views: {
// 	            	'content': providersTemplate
// 	            }
// 	        })
// 	        .state('mediators', {
// 	            url: '/mediators',
// 	            views: {
// 	            	'content': mediatorsTemplate
// 	            }
// 	        })
// 	        .state('summaries', {
// 	            url: '/summaries',
// 	            views: {
// 	            	'content': summariesTemplate
// 	            }
// 	        })
// 	        .state('directories', {
// 	            url: '/directories',
// 	            views: {
// 	            	'content': directoriesTemplate
// 	            }
// 	        })
// 	        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
// 	        .state('about', {
// 	            url: '/about',
// 	            views: {
// 	            	'content':  {
// 	            		template:"This is the coolest app!" 
// 	            	}
// 	            }
// 	        });     
})