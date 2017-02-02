'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';

function DeliveryCtrl($scope, $state, orderList, OrderService, Flash, PositionService){

	$scope.obj = { selfMailing : false };
	$scope.onlyTomorrow = true;
	filterObjects();
	
	$scope.showTomorrows = function() {
		$scope.onlyTomorrow = ! $scope.onlyTomorrow;
		filterObjects();
	};

	orderList.map( function(order) {
		order.consumer_name = toUnsafeString( order.consumer_name );
		return order;
	})

	function formattedDate(dat){
		var curr_date = dat.getDate();
		var curr_month = dat.getMonth() + 1;
		var curr_year = dat.getFullYear();

		return (curr_year + "-" + (curr_month < 10 ? "0"+curr_month : curr_month ) + "-" + (curr_date < 10 ? "0"+curr_date : curr_date ));
	}

	function filterObjects() {
		
		var today = new Date();
		var tomorrow = new Date(today.setDate(today.getDate()+1));

		if ($scope.onlyTomorrow) {
			$scope.orders = _.filter( orderList, function(o) {
				return (o.planned_delivery_at.substr(0,10) == formattedDate( tomorrow ) );
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
		OrderService.report(Number($scope.obj.selfMailing))
			.then( function(respond) {
				console.log(respond);
		        var message = '<strong>Отчет о планируемых отгрузках успешно отправлен!</strong>';
		        var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
			})
	}

}

module.exports = DeliveryCtrl; 