'use strict';
var _ = require('lodash');

function CommodityCardCtrl($scope, $state, CommodityService, currentCommodity) {

	// console.log(currentCommodity);

	if ($state.current.name === 'commodity_add') {
		$scope.submitCaption = "Add";
		$scope.commodityName = "";
		$scope.commodityPrice1 = 0.00;
		$scope.commodityPrice2 = 0.00;
		$scope.commodityPrice3 = 0.00;
		// $scope.formUrl = $sce.trustAsResourceUrl('/users/' + user.id);
	} else {
		$scope.submitCaption = "Update";
		$scope.commodityName = currentCommodity.name;
		$scope.commodityPrice1 = Number(currentCommodity.price1);
		$scope.commodityPrice2 = Number(currentCommodity.price2);
		$scope.commodityPrice3 = Number(currentCommodity.price3);
	}

	$scope.backToList = function(){
		$state.go('commodities');
	}

	$scope.saveCommodity = function() {
		var formData = new FormData();

		formData.append('name', $scope.commodityName);
		formData.append('price1', $scope.commodityPrice1);
		formData.append('price2', $scope.commodityPrice2);
		formData.append('price3', $scope.commodityPrice3);
		formData.append('photo', $scope.commodityPhoto);

		if ($state.current.name === 'commodity_add') {
			CommodityService.add()
				.then(function(newConsumer) {
					$scope.backToList();
				})
		} else {
			formData.append('photoUrl', currentCommodity.photo);
			formData.append('id', currentCommodity.id);
			CommodityService.update(formData)
				.then(function(updatedConsumer) {
					$scope.backToList();
				})
		}
	}



	// $scope.saveCommodity = function() {
	// }
}

module.exports = CommodityCardCtrl; 