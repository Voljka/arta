'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';

function OrderCtrl($scope, $state, consumerList, orderList, positionList, workerList, OrderService) {

	$scope.currentOrder = OrderService.current();

	$scope.consumers = consumerList;
	$scope.orders = orderList;
	$scope.workers = workerList;
	$scope.positions = positionList;

	$scope.orders.map( function(order) {
		console.log(_.find($scope.workers, { id: order.worker}));
		console.log(_.find($scope.consumers, { id: order.consumer}))
		var workerName = (_.find($scope.workers, { id: order.worker})).lastname;
		var consumerName = (_.find($scope.consumers, { id: order.consumer})).name;

		Object.assign(order, { worker_name: workerName, consumer_name: toUnsafeString( consumerName ) });
		return order;
	})

	filterObjects($scope.orders); 

	$scope.select = function(order) {
		// if we select 

		$scope.orders = _.map($scope.orders, function(c) {
			if (c.id === order.id) {
				// if taken consumer is already selected
				if (OrderService.current() == order) {
					// deselect 
					OrderService.select(undefined);
					c.selected = false;
					return c;
				} else {
					OrderService.select(order);
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})

		$scope.currentOrder = OrderService.current();
	}


	$scope.useFilter = function(){
		filterObjects();
	}

	$scope.add = function() {
		$state.go('order_add');
	}

	$scope.edit = function() {
		$state.go('order_modify');
	}

	$scope.delete = function() {
		OrderService.delete();
	}

	function filterObjects() {
		
		if (! $scope.filteredObjects) {
			$scope.filteredObjects = $scope.orders;
		} else {
			$scope.filteredObjects = _.filter( $scope.orders, function(o) {
				var consumer = o.consumer_name.toLowerCase();
				return consumer.indexOf($scope.textFilter.toLowerCase()) > -1
			}) 
		}
	}

}

module.exports = OrderCtrl; 