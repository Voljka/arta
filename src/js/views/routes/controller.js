'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';

function RouteCtrl($scope, $state, consumerList, regionList, Flash, ConsumerService) {

	consumerList.map( function(consumer) {
		var name = toUnsafeString( consumer.name );
		var place = toUnsafeString( consumer.place );
		var representatives = toUnsafeString( consumer.representatives );
		var notes = toUnsafeString( consumer.notes );

		Object.assign(consumer, 
					{ 
						name: name,
						representatives: representatives, 
						place: place, 
						notes: notes,
						route_order_id: Number(consumer.route_order_id)
					});
		
		return consumer;
	})

	$scope.regions = regionList;
	$scope.selectedRegion = regionList[0].id;

	pickConsumers();

	$scope.selectRegion = function(){
		pickConsumers();

	}

	function pickConsumers(){

		$scope.consumers = _.sortBy( consumerList, ['route_order_id']);
		
		$scope.consumers = _.filter( $scope.consumers, function(o) {
			return (o.region == $scope.selectedRegion)
		})

		// console.log($scope.consumers);
	}

	$scope.saveOrder = function() {
		var order = [];
		// console.log('saving ORder')

		for (var i=1; i <= $scope.consumers.length; i++) {
			order.push({id: $scope.consumers[i-1].id, route_order_id: i, name: $scope.consumers[i-1].name})
		}

		// console.log(order);

		ConsumerService.saveOrder({order: order})
			.then( function(respond){
				console.log(respond);

		        var message = '<strong>Маршрут успешно сохранен!</strong>';
		        var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
			})
	}
}

module.exports = RouteCtrl;