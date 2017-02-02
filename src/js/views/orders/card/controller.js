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
		if (obj.is_old == 1) {
			name = 'яяяСтарый__ ' + name;
		}

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
	//$scope.commodities = commodityList;

	$scope.filters = {
		commodity : "",
		consumer : ""
	}

	$scope.checkForSaveNeedings = function() {
		$scope.toBeSaved = true;

	}

	$scope.useConsumerFilter = function() {
		$scope.consumers = _.filter( consumerList, function(o) {
			var consumer = o.name.toLowerCase();
			return consumer.indexOf($scope.filters.consumer.toLowerCase()) > -1
		})

		if ($scope.consumers.length > 0) {
			$scope.consumerList = $scope.consumers[0].id;
			$scope.changeConsumer();
		}

	}

	$scope.useFilter = function(position) {
		if (! $scope.commodities) {
			$scope.commodities = commodityList;
		} else {
			$scope.commodities = _.filter( commodityList, function(o) {
				var commodity = o.name.toLowerCase();
				return commodity.indexOf($scope.filters.commodity.toLowerCase()) > -1
			})

			if ($scope.commodities.length > 0) {
				$scope.comSelect = $scope.commodities[0].id;
				
				
				$scope.positions.map( function(o) {
					if (o.id == position.id) {
						o.commodity = $scope.commodities[0].id;
						$scope.changeCommodity(o);
					}

					return o;
				})
			}
		}		
	}

	$scope.useFilter();
	$scope.positions = positionList;


	$scope.currentOrder = current;

	$scope.currentConsumer = ($state.current.name == 'order_modify') ? current.consumer : $scope.consumers[0].id;
	$scope.self_delivery = ($state.current.name == 'order_modify') ? Boolean(Number(current.self_delivery)) : 0;
	
	$scope.fullConsumer = _.find(consumerList, {id: $scope.currentConsumer});
	var currentIsVip = $scope.fullConsumer.is_vip;

	$scope.currentForm = ($state.current.name == 'order_modify') ? current.form : "1";
	$scope.deliveryDate = ($state.current.name == 'order_modify') ? (new Date(current.planned_delivery_at.substr(0,10))) : (new Date( plannedDelivery() ));

	orderChanges.planned_delivery_at = formattedDate( $scope.deliveryDate );
	orderChanges.consumer = $scope.fullConsumer.id;

	if ($scope.fullConsumer.is_vip == 1) {
		$scope.priceType = 1;
	} else {
		if ($scope.self_delivery) {
			$scope.priceType = 1;
		} else {
			$scope.priceType = 3;
		}
	}

	$scope.changeSelfDelivery = function(){
		var bySelf = $scope.self_delivery ? 1 : 0;

		if (Number($scope.fullConsumer.is_vip) != 1) {
			if ($scope.self_delivery) {
				setNewPrices(1);

				$scope.priceType = 1;

				orderChanges.edited = _.filter($scope.positions, function(o){
					return ! o.new;
				});					

				orderChanges.added = _.filter($scope.positions, function(o){
					return o.new;
				});					

			} else {
				$scope.orderSum();
			}
		}

		if ($state.current.name == 'order_modify' && MainService.current().self_delivery != bySelf) {
			$scope.toBeSaved = true;
		}

		$scope.toBeSaved = true;
	}

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
		$scope.filters.commodity = "";
		$scope.commodities = commodityList;
		$scope.comSelect = commodityList[0].id;

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
		$scope.filters.commodity = "";
		$scope.commodities = commodityList;

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
		if (position.commodity) {
			var selectedCommodity = _.find(commodityList, {id: position.commodity});

			position.commodity_name = selectedCommodity.name;

			if (($scope.fullConsumer.is_vip == 1)) {
				position.price = Number((selectedCommodity).price1);
			} else {
				position.price = Number((selectedCommodity).price3);
			}
		}
	}

	$scope.changeConsumer = function(){

		if ($scope.consumers.length > 0) {
			$scope.toBeSaved = true;
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

		} else {
			$scope.toBeSaved = false;
			$scope.fullConsumer = {place: ""};
		}

	}

	$scope.removePosition = function(position) {
		if (! position.new) {
			orderChanges.deleted.push(position.id);
			$scope.toBeSaved = true;
		} else {
			orderChanges.added = orderChanges.added.filter( function(o) {
				return o.id != position.id;
			})
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
			if (position.new && $scope.commodities.length == 0) {
			} else {
				result += position.quantity * position.price;
				resultByPrice3 += position.quantity * Number((_.find( $scope.commodities, {id: position.commodity} )).price3);
			}
		})

		if (! (($scope.fullConsumer.is_vip == 1)) && ! $scope.self_delivery ) {

				if (resultByPrice3 > 50000) {
					if ($scope.priceType != 1) {
						// set price1 as a price 
						setNewPrices(1);
						$scope.priceType = 1;
						orderChanges.edited = _.filter($scope.positions, function(o){
							return ! o.new;
						});					

						orderChanges.added = _.filter($scope.positions, function(o){
							return o.new;
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

							orderChanges.added = _.filter($scope.positions, function(o){
								return o.new;
							});					
						}
					} else {
						if (resultByPrice3 < 10000) {
							if ($scope.priceType != 3) {
								// set price1 as a price 
								setNewPrices(3);
								$scope.priceType = 3;
								//////////////////
								//////////////////
								////////////////// updated added part of orderChanges
								orderChanges.edited = _.filter($scope.positions, function(o){
									return ! o.new;
								});					

								orderChanges.added = _.filter($scope.positions, function(o){
									return o.new;
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
			if (position.new && $scope.commodities.length == 0) {

			} else {
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
			}

			return position;
		})
	}

	$scope.saveOrder = function() {
		console.log('Save Order changes: ');
		orderChanges.form = $scope.formSelect;
		orderChanges.self_delivery = $scope.self_delivery ? 1 : 0;
		orderChanges.ordered_at = ($state.current.name == "order_modify" ? current.ordered_at : formattedDate(new Date()) ) ;
		orderChanges.planned_delivery_at = $scope.deliveryDate;
		console.log(orderChanges);

		MainService.select(undefined);

		MainService.save(orderChanges)
			.then( function(data){
				$state.go('orders');
			})		

	}

	// $scope.comNotes = {
	// 	"width": "400px"
	// }

	// $scope.comSelect = {
	// 	"width": "430px"
	// }

	// $scope.comQuantity = {
	// 	"width": "50px"
	// }
}

module.exports = CardCtrl; 
