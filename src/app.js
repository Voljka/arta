var angular = require('angular');
require('angular-route');
require('angular-ui-router');

var commodityTemplate = require('./js/views/commodities');
var commodityCardTemplate = require('./js/views/commodities/card');
var consumerTemplate = require('./js/views/consumers');
var consumerCardTemplate = require('./js/views/consumers/card');
var orderTemplate = require('./js/views/orders');
var orderCardTemplate = require('./js/views/orders/card');
var deliveryTemplate = require('./js/views/deliveries');
var visitTemplate = require('./js/views/visits');
var visitCardTemplate = require('./js/views/visits/card');
var routingTemplate = require('./js/views/routes');

var app = angular
	.module('artaApp', [
		'ui.router', 
		'ngRoute', 
		'commodityModule',
		'commodityCardModule',
		'consumerModule',
		'consumerCardModule',
		'orderModule',
		'orderCardModule',
		'deliveryModule',
		'visitModule',
		'visitCardModule',
		'routingModule',
	])

	.controller('MainCtrl', function($scope) {
		$scope.temporal_variable = 'Ok';
	})

	.config(function($stateProvider, $urlRouterProvider) {
    
    	$urlRouterProvider.otherwise('/orders');
    
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
	        .state('orders', {
	            url: '/orders',
	            views: {
	            	'content': orderTemplate
	            }
	        })
	        .state('order_add', {
	            url: '/order/add',
	            views: {
	            	'content': orderCardTemplate
	            }
	        })
	        .state('order_modify', {
	            url: '/order/modify',
	            views: {
	            	'content': orderCardTemplate
	            }
	        })
	        .state('deliveries', {
	            url: '/deliveries',
	            views: {
	            	'content': deliveryTemplate
	            }
	        })
	        .state('visits', {
	            url: '/visits',
	            views: {
	            	'content': visitTemplate
	            }
	        })
	        .state('visit_report_add', {
	            url: '/visit/add',
	            views: {
	            	'content': visitCardTemplate
	            }
	        })
	        .state('visit_report_modify', {
	            url: '/visit/modify',
	            views: {
	            	'content': visitCardTemplate
	            }
	        })
	        .state('routing', {
	            url: '/routing',
	            views: {
	            	'content': routingTemplate
	            }
	        })
})