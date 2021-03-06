'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';


function OrderCtrl($scope, $state, consumerList, orderList, Flash, OrderService){

	$scope.obj = { selfMailing: false };
	$scope.notReportedOnly = false;
	$scope.textFilter = "";

	$scope.currentOrder = OrderService.current();
	
	$scope.consumers = consumerList;
	
	$scope.orders = orderList;

	filterObjects($scope.orders); 

	$scope.orders.map( function(order) {
		order.consumer_name = toUnsafeString( order.consumer_name );
		return order;
	})

	$scope.select = function(order) {
		// if we select 

		$scope.orders = _.map($scope.orders, function(c) {
			if (c.id === order.id) {
				if (OrderService.current() == order) {
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

	$scope.showNotReported = function() {
		$scope.notReportedOnly = ! $scope.notReportedOnly;
		filterObjects();
	}

	$scope.sendReport = function() {
		console.log($scope.selfMailing);
		OrderService.send(Number($scope.obj.selfMailing))
			.then( function(respond) {
				console.log(respond);

		        var message = '<strong>Заказ успешно отправлен!</strong>';
		        var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
				// save Order as Reported
				if (! $scope.selfMailing) {
					return OrderService.reported()
						.then( function(reportedDate) {
							$scope.orders.map( function(order) {
								if ($scope.currentOrder.id == order.id) {
									order.reported_at = reportedDate;
									order.selected = false;
								}

								return order;
							})

							$scope.currentOrder = undefined;

							OrderService.select(undefined);
							filterObjects();
						})
				}
			})
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
		OrderService.delete()
			.then(function(respond){
				console.log(respond);
		        var message = '<strong>Заказ успешно удален!</strong>';
		        var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
		        OrderService.allDetailed()
		        	.then( function(data) {
						$scope.orders = data;

						$scope.orders.map( function(order) {
							order.consumer_name = toUnsafeString( order.consumer_name );
							return order;
						})		        
						filterObjects($scope.orders); 

		        	})
			})
	}

	function filterObjects() {
		
		if (! $scope.filteredObjects) {
			$scope.filteredObjects = $scope.orders;
		} else {
			$scope.filteredObjects = _.filter( $scope.orders, function(o) {
				var consumer = o.consumer_name.toLowerCase();

				var filterCondition = consumer.indexOf($scope.textFilter.toLowerCase()) > -1 ? true : false;

				var reportedCondition = $scope.notReportedOnly ? (o.reported_at ? false : true) : true;

				return filterCondition && reportedCondition;
			}) 
		}
	}
	
	$scope.numberSplitted = function(num)  {
		num = Number(num).toFixed(2);
		return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
	}	

}

module.exports = OrderCtrl; 