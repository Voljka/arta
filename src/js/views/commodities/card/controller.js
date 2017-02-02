'use strict';
var _ = require('lodash');

function CommodityCardCtrl($scope, $state, CommodityService, currentCommodity) {

	// console.log(currentCommodity);

	if ($state.current.name === 'commodity_add') {
		$scope.submitCaption = "Добавить";
		$scope.commodityName = "";
		$scope.commodityOld = false;
		$scope.commodityPrice1 = 0.00;
		$scope.commodityPrice2 = 0.00;
		$scope.commodityPrice3 = 0.00;
		$scope.commodityPhoto = "";
		// $scope.formUrl = $sce.trustAsResourceUrl('/users/' + user.id);
	} else {
		$scope.submitCaption = "Обновить";
		$scope.commodityName = currentCommodity.name;
		$scope.commodityPrice1 = Number(currentCommodity.price1);
		$scope.commodityPrice2 = Number(currentCommodity.price2);
		$scope.commodityPrice3 = Number(currentCommodity.price3);
		$scope.commodityOld = Boolean(Number(currentCommodity.is_old));
		$scope.commodityPhoto = currentCommodity.photo;
	}

	$scope.backToList = function(){
		$state.go('commodities');
	}

	$scope.saveCommodity = function() {
		// var formData = new FormData();

		// formData.append('name', $scope.commodityName);
		// formData.append('price1', $scope.commodityPrice1);
		// formData.append('price2', $scope.commodityPrice2);
		// formData.append('price3', $scope.commodityPrice3);
		// formData.append('photo', $scope.commodityPhoto);
		// formData.append('is_old', Number($scope.commodityOld));

		var formData = {
			name: $scope.commodityName,
			price1: $scope.commodityPrice1,
			price2: $scope.commodityPrice2,
			price3: $scope.commodityPrice3,
			photo: $scope.commodityPhoto,
			is_old: Number($scope.commodityOld),
		}

		if ($state.current.name === 'commodity_add') {
			CommodityService.add(formData)
				.then(function(newConsumer) {
					console.log(newConsumer);
					$scope.backToList();
				})
		} else {
			// formData.append('photoUrl', currentCommodity.photo);
			formData.id = currentCommodity.id;

			CommodityService.update(formData)
				.then(function(updatedConsumer) {
					console.log(updatedConsumer);
					$scope.backToList();
				})
		}
	}



	// $scope.saveCommodity = function() {
	// }
}

module.exports = CommodityCardCtrl; 