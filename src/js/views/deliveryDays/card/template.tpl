<!-- <h3>Commodity Card</h3>
<form action="saveCommodity()" enctype="multipart/form-data">
	<input type="text" ng-model="commodityName">
	<input type="number" ng-model="commodityPrice1">
	<input type="number" ng-model="commodityPrice2">
	<input type="number" ng-model="commodityPrice3">
	<input type="file" ng-file-select="commodityPhoto">

	<input type="submit" ng-value="{{ submitCaption }}">
</form>

<button class="btn btn-primary" ng-click="saveCommodity()">{{ submitCaption }}</button>
<button class="btn btn-warning" ng-click="backToList()">Cancel</button>
 -->
<h3>Commodity Card</h3>
<input type="text" ng-model="commodityName">
<input type="number" ng-model="commodityPrice1">
<input type="number" ng-model="commodityPrice2">
<input type="number" ng-model="commodityPrice3">
<input type="file" file-model="commodityPhoto">

<button class="btn btn-primary" ng-click="saveCommodity()">{{ submitCaption }}</button> 
<button class="btn btn-warning" ng-click="backToList()">Cancel</button>

<!-- <select class="select" ng-model="consumerGroup" ng-init="consumerGroup=consumerCurrentGroup">   
	<option ng-repeat="group in groups" ng-value="group._id">{{ group.name }}</option>	
</select>
 -->
<!-- <button class="btn btn-primary" ng-click="saveCommodity()">{{ submitCaption }}</button> -->
