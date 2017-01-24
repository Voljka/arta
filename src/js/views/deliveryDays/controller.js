'use strict';
var _ = require('lodash');

function CommodityCtrl($scope, $state, CommodityService) {

	$scope.currentCommmodity = CommodityService.current();

	CommodityService.all()
		.then(function(data) {
			$scope.commodities = data;

			filterObjects(); 
		})

	$scope.select = function(commodity) {
		// if we select 

		$scope.commodities = _.map($scope.commodities, function(c) {
			if (c.id === commodity.id) {
				// if taken consumer is already selected
				if (CommodityService.current() == commodity) {
					// deselect 
					CommodityService.select(undefined);
					c.selected = false;
					return c;
				} else {
					CommodityService.select(commodity);
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})

		$scope.currentCommodity = CommodityService.current();
	}


	$scope.useFilter = function(){
		filterObjects();
	}

	$scope.add = function() {
		$state.go('commodity_add');
	}

	$scope.edit = function() {
		$state.go('commodity_modify');
	}

	$scope.delete = function() {
		CommodityService.delete();
	}

	function filterObjects() {
		
		if (! $scope.filteredObjects) {
			$scope.filteredObjects = $scope.commodities;
		} else {
			$scope.filteredObjects = _.filter( $scope.commodities, function(o) {
				var commodity = o.name.toLowerCase();
				return commodity.indexOf($scope.textFilter.toLowerCase()) > -1
			}) 
		}
	}

	$scope.numberSplitted = function(num)  {
		num = Number(num).toFixed(2);
		return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
	}

}

module.exports = CommodityCtrl; 
