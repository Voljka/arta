var angular = require('angular');
require('angular-route');
require('angular-ui-router');

var commodityTemplate = require('./js/views/commodities');
var commodityCardTemplate = require('./js/views/commodities/card');
var consumerTemplate = require('./js/views/consumers');
var consumerCardTemplate = require('./js/views/consumers/card');
// var orderTemplate = require('./js/views/orders');
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
		'commodityCardModule',
		'consumerModule',
		'consumerCardModule',
		// 'orderModule'
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
	        .state('commodity_add', {
	            url: '/commodity/add',
	            views: {
	            	'content': commodityCardTemplate
	            }
	        })
	        .state('commodity_modify', {
	            url: '/commodity/modify',
	            views: {
	            	'content': commodityCardTemplate
	            }
	        })
	        .state('consumers', {
	            url: '/consumers',
	            views: {
	            	'content': consumerTemplate
	            }
	        })
	        .state('consumer_add', {
	            url: '/consumer/new',
	            views: {
	            	'content': consumerCardTemplate
	            }
	        })
	        .state('consumer_modify', {
	            url: '/consumer/modify',
	            views: {
	            	'content': consumerCardTemplate
	            }
	        })
	        // .state('orders', {
	        //     url: '/orders',
	        //     views: {
	        //     	'content': orderTemplate
	        //     }
	        // })
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