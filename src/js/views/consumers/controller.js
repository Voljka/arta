'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';

function ConsumerCtrl($scope, $state, consumerList, regionList, workerList, ConsumerService) {

	$scope.currentConsumer = ConsumerService.current();

	consumerList = consumerList.map( function(consumer) {
		var name = toUnsafeString( consumer.name );

		Object.assign(consumer, { name: name });
		return consumer;
	})

	$scope.consumers = consumerList;
	$scope.workers = workerList;
	$scope.regions = regionList;

	$scope.consumers.map( function(consumer) {
		var workerName = (_.find($scope.workers, { id: consumer.worker})).lastname;
		var regionName = (_.find($scope.regions, { id: consumer.region})).name;
		var name = toUnsafeString( consumer.name );//.replace(/&#34;/g, '\"').replace(/&#39;/g, '\'');

		Object.assign(consumer, { worker_name: workerName, region_name: regionName , name: name });
		return consumer;
	})

	filterObjects($scope.consumers); 

	$scope.select = function(consumer) {
		// if we select 

		$scope.consumers = _.map($scope.consumers, function(c) {
			if (c.id === consumer.id) {
				if (ConsumerService.current() == consumer) {
					ConsumerService.select(undefined);
					c.selected = false;
					return c;
				} else {
					ConsumerService.select(consumer);
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})

		$scope.currentConsumer = ConsumerService.current();
	}


	$scope.useFilter = function(){
		filterObjects();
	}

	$scope.add = function() {
		$state.go('consumer_add');
	}

	$scope.edit = function() {
		$state.go('consumer_modify');
	}

	$scope.delete = function() {
		ConsumerService.delete();
	}

	function filterObjects() {
		
		if (! $scope.filteredObjects) {
			$scope.filteredObjects = $scope.consumers;
		} else {
			$scope.filteredObjects = _.filter( $scope.consumers, function(o) {
				var consumer = o.name.toLowerCase();
				return consumer.indexOf($scope.textFilter.toLowerCase()) > -1
			}) 
		}
	}

}

module.exports = ConsumerCtrl; 
