<h3>Consumer Card</h3>
<input type="text" ng-model="name">
<select class="select" ng-model="regionList" ng-init="regionList=currentRegion">   
	<option ng-repeat="region in regions" ng-value="region.id">{{ region.name }}</option>	
</select>

<input type=text ng-model="place">
<input type=text ng-model="representatives">
<input type=text ng-model="mail">
<input type=text ng-model="notes">

<select class="select" ng-model="managerList" ng-init="managerList=currentManager">   
	<option ng-repeat="manager in workers" ng-value="manager.id">{{ manager.lastname }}</option>	
</select>

<button class="btn btn-primary" ng-click="save()">{{ submitCaption }}</button> 
<button class="btn btn-warning" ng-click="backToList()">Cancel</button>

<!-- <button class="btn btn-primary" ng-click="saveCommodity()">{{ submitCaption }}</button> -->
