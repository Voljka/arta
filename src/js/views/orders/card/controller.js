'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../../libs/strings';

function CardCtrl($scope, $state, current, consumerList, commodityList, positionList, deliveryDaysList, MainService) {

	consumerList.map( function(consumer) {
		var name = toUnsafeString( consumer.name );

		Object.assign(consumer, { name: name });
		return consumer;
	})

	commodityList.map( function(obj) {
		var name = toUnsafeString( obj.name );

		Object.assign(obj, { name: name });
		return obj;
	})

	consumerList = _.sortBy( consumerList, ['name']);
	commodityList = _.sortBy( commodityList, ['name']);

	if ($state.current.name == 'order_add') {
		positionList = [];
		current = undefined;
		$scope.current = current;
	} else {
		$scope.current = current;
	}
	

	var idCounter = 1000000000000;

	var temporalPosition;

	var orderChanges = {
		edited: [],
		added: [],
		deleted: [],
		consumer: undefined,
		worker: 1,
		planned_delivery_at: plannedDelivery(),
		order: $state.current.name == "order_modify" ? current.id : "new"
	}


	$scope.editingMode = false;
	$scope.toBeSaved = false;

	$scope.consumers = consumerList;
	$scope.commodities = commodityList;
	$scope.positions = positionList;

	// $scope.consumers.map( function(consumer) {
	// 	var name = toUnsafeString( consumer.name );

	// 	Object.assign(consumer, { name: name });
	// 	return consumer;
	// })
	

	$scope.currentOrder = current;


	$scope.currentConsumer = ($state.current.name === 'order_modify') ? current.consumer : $scope.consumers[0].id;
	
	$scope.fullConsumer = _.find(consumerList, {id: $scope.currentConsumer});
	var currentIsVip = $scope.fullConsumer.is_vip;

	$scope.currentForm = ($state.current.name === 'order_modify') ? current.form : "1";
	$scope.deliveryDate = ($state.current.name === 'order_modify') ? (new Date(current.planned_delivery_at.substr(0,10))) : (new Date( plannedDelivery() ));

	orderChanges.planned_delivery_at = formattedDate( $scope.deliveryDate );
	orderChanges.consumer = $scope.fullConsumer.id;

	if ($scope.fullConsumer.is_vip == 1) {
		$scope.priceType = 1;
	} else {
		$scope.priceType = 3;
	}

	// filterObjects($scope.consumers); 

	// $scope.useFilter = function(){
	// 	filterObjects();
	// }

	// function filterObjects() {
		
	// 	if (! $scope.filteredObjects) {
	// 		$scope.filteredObjects = $scope.consumers;
	// 	} else {
	// 		$scope.filteredObjects = _.filter( $scope.consumers, function(o) {
	// 			var consumer = o.name.toLowerCase();
	// 			return consumer.indexOf($scope.textFilter.toLowerCase()) > -1
	// 		}) 
	// 	}
	// }

	function formattedDate(dat){
		var curr_date = dat.getDate();
		var curr_month = dat.getMonth() + 1;
		var curr_year = dat.getFullYear();

		return (curr_year + "-" + (curr_month < 10 ? "0"+curr_month : curr_month ) + "-" + (curr_date < 10 ? "0"+curr_date : curr_date ));
	}

	function plannedDelivery(selectedConsumer) {

		var consumerRegion;

		if (selectedConsumer) {
			consumerRegion = selectedConsumer.region;
		} else {
			consumerRegion = consumerList[0].region;
		}

		var consumerPlan = _.sortBy(_.filter(deliveryDaysList, { region: consumerRegion }), ['delivery_day']);
		var today = new Date();

		var closestDay = _.find( consumerPlan, function(o) {
			return o.delivery_day > today.getDay()
		})


		if (! closestDay) {
			closestDay = consumerPlan[0];
		} 

		var days = Number(closestDay.delivery_day) - (today.getDay() == 0 ? 7 : today.getDay());

		if (days == 0) {
			days = 7;
		} else {
			if (days < 0) {
				days = 7 + days;
			}
		}
		// console.log(days);

		//return "2017-12-25"

		return today.setDate(today.getDate() + days)
	}

	function getCounter(){
		idCounter++;
		return idCounter;
	}

	$scope.add = function() {
		var newPosition = {};

		newPosition.new = true;
		newPosition.id = getCounter();
		newPosition.quantity = 1;
		newPosition.notes = "";
		newPosition.order_id = "new";
		newPosition.planned_delivery_at = plannedDelivery();
		newPosition.commodity_name = commodityList[0].name;
		newPosition.commodity = commodityList[0].id;

		if (($scope.fullConsumer.is_vip == 1)) {
			newPosition.price = Number(commodityList[0].price1);
		} else {
			newPosition.price = Number(commodityList[0].price3);
		}

		newPosition.editing = true;

		$scope.editingMode = true;

		$scope.positions.push(newPosition);
	}

	$scope.modifyPosition = function(id) {

		$scope.positions.map( function(position) {
			if (position.id == id) {
				temporalPosition = Object.assign({},position);
				position.editing = true;
				position.price = Number(position.price);
				position.quantity = Number(position.quantity);
			}

			return position;
		})
		$scope.editingMode = true;
	}

	$scope.changeCommodity = function(position) {
		var selectedCommodity = _.find(commodityList, {id: position.commodity});

		position.commodity_name = selectedCommodity.name;

		if (($scope.fullConsumer.is_vip == 1)) {
			position.price = Number((selectedCommodity).price1);
		} else {
			position.price = Number((selectedCommodity).price3);
		}
	}

	$scope.changeConsumer = function(){
		$scope.fullConsumer = _.find(consumerList, {id: $scope.consumerList});

		$scope.deliveryDate = new Date( plannedDelivery(_.find(consumerList, {id: $scope.consumerList})) );
		orderChanges.planned_delivery_at = formattedDate( $scope.deliveryDate );

		if (currentIsVip != $scope.fullConsumer.is_vip) {
			currentIsVip = $scope.fullConsumer.is_vip;
			setNewPrices();
			orderChanges.edited = _.filter($scope.positions, function(o){
				return ! o.new;
			});
		}

		if (currentIsVip == 1) {
			$scope.priceType = 1;
		}

		if ($state.current.name == 'order_modify' && $scope.fullConsumer.id != $scope.current.consumer ) {
			$scope.toBeSaved = true;

		} 

		orderChanges.consumer = $scope.fullConsumer.id;

	}

	$scope.removePosition = function(position) {
		if (! position.new) {
			orderChanges.deleted.push(position.id);
			$scope.toBeSaved = true;
		}

		$scope.positions = _.filter($scope.positions, function(o){
			return o.id != position.id;
		});
	}

	$scope.restorePosition = function(position) {
		if (position.new) {
			$scope.positions = _.filter($scope.positions, function(o){
				return ! o.new;
			});
			$scope.editingMode = false;
		} else {
			Object.assign(position,  { editing: false },temporalPosition);
			$scope.editingMode = false;
		}
	}

	$scope.savePosition = function(position) {
		position.editing = false;
		$scope.editingMode = false;

		if (position.new) {
			$scope.toBeSaved = true;
			// if this is a second version of new position in the order
			var newPositionAlreadyAdded = false;
			orderChanges.added.forEach( function(o) {
				if (position.id == o.id) {
					newPositionAlreadyAdded = true;
					// make changes in existing record
					o.commodity = position.commodity;
					o.price = position.price;
					o.quantity = position.quantity;
				}
			})

			if (! newPositionAlreadyAdded) {
				orderChanges.added.push(position);
			}
		} else {
			var existingPositionAlreadyAdded = false;
			orderChanges.edited.forEach( function(o) {
				if (position.id == o.id) {
					existingPositionAlreadyAdded = true;
					// make changes in existing record
					o.commodity = position.commodity;
					o.price = position.price;
					o.quantity = position.quantity;
				}
			})

			if (! existingPositionAlreadyAdded) {
				// if we made any changes to existing position
				if (temporalPosition.commodity != position.commodity || 
						temporalPosition.price != position.price || 
						temporalPosition.quantity != position.quantity ||
						temporalPosition.notes != position.notes) {
					orderChanges.edited.push(position);
					$scope.toBeSaved = true;
				}
			}
		}
	}

	$scope.numberSplitted = function(num)  {
		num = Number(num).toFixed(2);
		return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
	}

	$scope.orderSum = function() {
		var result = 0;
		var resultByPrice3 = 0;

		$scope.positions.forEach( function(position) {
			result += position.quantity * position.price;
			resultByPrice3 += position.quantity * Number((_.find( $scope.commodities, {id: position.commodity} )).price3);
		})


		if (! (($scope.fullConsumer.is_vip == 1))) {

			if (resultByPrice3 > 50000) {
				if ($scope.priceType != 1) {
					// set price1 as a price 
					setNewPrices(1);
					$scope.priceType = 1;
					orderChanges.edited = _.filter($scope.positions, function(o){
						return ! o.new;
					});					
				}
			} else {
				if (resultByPrice3 >= 10000) {
					if ($scope.priceType != 2) {
						// set price2 as a price 
						setNewPrices(2);
						$scope.priceType = 2;
						orderChanges.edited = _.filter($scope.positions, function(o){
							return ! o.new;
						});					
					}
				} else {
					if (resultByPrice3 < 10000) {
						if ($scope.priceType != 3) {
							// set price1 as a price 
							setNewPrices(3);
							$scope.priceType = 3;
							orderChanges.edited = _.filter($scope.positions, function(o){
								return ! o.new;
							});					
						}
					}
				}
			}
		} else {

		}

		return result;
	}

	function setNewPrices(type){
		$scope.positions.map( function(position) {

			var com = (_.find( $scope.commodities, {id: position.commodity} ));
			
			if ($scope.fullConsumer.is_vip == 1) {
				position.price = com.price1;

			} else {
				switch (type) {
					case 1: 
						position.price = com.price1;
						break;
					case 2: 
						position.price = com.price2;
						break;
					default: 
						position.price = com.price3;
				}

			}

			return position;
		})
	}

	// function filterObjects() {
		
	// 	if (! $scope.consumers) {
	// 		$scope.consumers = consumerList;
	// 	} else {
	// 		$scope.consumers = _.filter( consumerList, function(o) {
	// 			var consumer = o.name.toLowerCase();
	// 			return consumer.indexOf($scope.filterConsumer.toLowerCase()) > -1
	// 		}) 
	// 	}
	// }

	// $scope.useFilter = function(){
	// 	filterObjects();
	// }		

	$scope.saveOrder = function() {
		console.log('Save Order changes: ');
		orderChanges.form = $scope.formSelect;
		orderChanges.ordered_at = ($state.current.name == "order_modify" ? current.ordered_at : formattedDate(new Date()) ) ;
		console.log(orderChanges);

		MainService.select(undefined);

		MainService.save(orderChanges)
			.then( function(data){
				$state.go('orders');
			})		

	}
}

module.exports = CardCtrl; 
