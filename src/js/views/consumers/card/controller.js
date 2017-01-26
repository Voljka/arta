'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../../libs/strings';

function ConsumerCardCtrl($scope, $state, workersList, regionsList, current, MainService) {

	console.log($state.current.name);
	
	if ($state.current.name == 'consumer_add') {
		$scope.submitCaption = "Add";
		$scope.name = "";
		$scope.representatives = "";
		$scope.mail = "";
		$scope.place = "";
		$scope.notes = "";
		$scope.currentRegion = regionsList[0].id;
		$scope.currentManager = workersList[0].id;
	} else {

		console.log('Current in controller');
		console.log(current);
		current.name = toUnsafeString(current.name) //.replace(/&#34;/g, '\"').replace(/&#39;/g, '\'');

		$scope.submitCaption = "Update";
		$scope.name = current.name;
		$scope.representatives = current.representatives;
		$scope.mail = current.mail;
		$scope.place = current.place;
		$scope.notes = current.notes;
		$scope.currentRegion = current.region;
		$scope.currentManager = current.worker;
	}

	$scope.workers = workersList;
	$scope.regions = regionsList;

	$scope.backToList = function(){
		$state.go('consumers');
	}

	$scope.save = function() {
		var formData = new FormData();

		// check mail format
		$scope.name = toSafeString( $scope.name ); // .replace(/\'/g, '&#39;').replace(/\"/g, '&#34;');

		formData.append('id', current.id);
		formData.append('name', $scope.name);
		formData.append('representatives', $scope.representatives);
		formData.append('notes', $scope.notes);
		formData.append('mail', $scope.mail);
		formData.append('place', $scope.place);
		formData.append('worker', $scope.managerList);
		formData.append('region', $scope.regionList);
		formData.append('payment_option', current ? current.payment_option : 5);

		if ($state.current.name === 'consumer_add') {
			MainService.add()
				.then(function(newObject) {
					console.log(newObject);
					$scope.backToList();
				})
		} else {
			MainService.update(formData)
				.then(function(updatedObject) {
					console.log(updatedObject);
					$scope.backToList();
				})
		}
	}
}

module.exports = ConsumerCardCtrl; 