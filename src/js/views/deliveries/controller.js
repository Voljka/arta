'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';

function DeliveryCtrl($scope, $state, orderList, OrderService, PositionService){

	$scope.onlyTomorrow = true;
	filterObjects();
	
	$scope.showTomorrows = function() {
		$scope.onlyTomorrow = ! $scope.onlyTomorrow;
		filterObjects();
	};

	function formattedDate(dat){
		var curr_date = dat.getDate();
		var curr_month = dat.getMonth() + 1;
		var curr_year = dat.getFullYear();

		return (curr_year + "-" + (curr_month < 10 ? "0"+curr_month : curr_month ) + "-" + (curr_date < 10 ? "0"+curr_date : curr_date ));
	}

	function filterObjects() {
		
		var today = new Date();

		if ($scope.onlyTomorrow) {
			$scope.orders = _.filter( orderList, function(o) {
				return (o.planned_delivery_at.substr(0,10) == formattedDate( today) );
			}) 
		} else {
			$scope.orders = orderList;
		}
	}
	
	$scope.numberSplitted = function(num)  {
		num = Number(num).toFixed(2);
		return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
	}	

	$scope.sendReport = function() {
		OrderService.report()
			.then( function(respond) {

			})
	}

}

module.exports = DeliveryCtrl; 