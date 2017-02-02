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

<div class="panel panel-info">
	<div class="panel-heading">Каточка товара</div>	
	<div class="panel panel-body">
		<div class="row">
			<div class="col-md-12">
				<div class="input-group">
					<span class="input-group-addon">Название товара</span>
					<input class="form-control" type="text" ng-model="commodityName">
				</div>
			</div>
		</div>
		<br>

		<div class="row">
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Цена &gt;50т</span>
					<input class="form-control" type="number" ng-model="commodityPrice1">
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Цена &gt;10т</span>
					<input class="form-control" type="number" ng-model="commodityPrice2">
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Цена &lt;10т</span>
					<input class="form-control" type="number" ng-model="commodityPrice3">
				</div>
			</div>
			<div class="col-md-3">
				<div class="input-group">
					<span class="input-group-addon">Устаревший</span>
					<input class="form-control" type="checkbox" ng-model="commodityOld">
					<input ng-show="false" type="text" disabled ng-model="commodityPhoto">
				</div>
			</div>
		</div>
	</div>

</div>

<div class="panel panel-default">
	<div class="panel-body">
		<center>
			<button class="btn btn-primary" ng-click="saveCommodity()">{{ submitCaption }}</button> 
			<button class="btn btn-warning" ng-click="backToList()">Отмена</button>
		</center>
	</div>
</div>

<!-- <input type="file" file-model="commodityPhoto"> -->


<!-- <select class="select" ng-model="consumerGroup" ng-init="consumerGroup=consumerCurrentGroup">   
	<option ng-repeat="group in groups" ng-value="group._id">{{ group.name }}</option>	
</select>
 -->
<!-- <button class="btn btn-primary" ng-click="saveCommodity()">{{ submitCaption }}</button> -->
