<div class="page-actions">
	<button class="btn btn-info" ng-click="add()">Add</button>
	<button ng-if="toBeSaved && ! editingMode" class="btn btn-info" ng-click="saveOrder()">Save Order</button>
</div>

<!-- <div class="page-filter">
	<input ng-model="filterConsumer" type="text" ng-change="useFilter()" placeholder="Consumer name filter">
</div> -->

<div class="page-content">
	<div class="consumer-info">
		<select class="select" ng-change="changeConsumer()" ng-model="consumerList" ng-init="consumerList=currentConsumer">   
			<option ng-repeat="consumer in consumers" ng-value="consumer.id">{{ consumer.name }}</option>
		</select>

		<h1 ng-if="fullConsumer.is_vip == 1"> VIP</h1>
		<h4> {{ fullConsumer.place }} </h4>
		<h4> {{ fullConsumer.representatives }} </h4>
		<h4> {{ fullConsumer.mail }} </h4>
		<h4> {{ fullConsumer.notes }} </h4>

		<input type="date" ng-model="deliveryDate">
		<select class="select" ng-model="formSelect" ng-init="formSelect=currentForm">   
			<option value="1"> Form 1 </option>
			<option value="2"> Form 2 </option>
		</select>
	</div>

	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Commodity</td>
				<td>Quantity</td>
				<td ng-class="priceType==2 ? 'price2' : ( priceType==1 ? 'price1' : '')">Price Type {{priceType}}</td>
				<td>Cost</td>
				<td>Actions</td>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<td colspan="3">
					<b><center>TOTAL</center></b>
				</td>
				<td class="price">
					<b>{{ numberSplitted(orderSum()) }}</b>
				</td>
			</tr>
		</tfoot>
		<tbody>
			<tr ng-repeat="position in positions">
				<!-- Commodity-->
				<td ng-if="! position.editing"> {{ position.commodity_name }} <p class="commodity-note" ng-if="position.notes.length > 1"> <b>Note: </b> {{position.notes}}</p></td>
				<td ng-if="position.editing">
					<select ng-change="changeCommodity(position)" class="select" ng-model="position.commodity">   
						<option ng-repeat="commodity in commodities" ng-value="commodity.id">{{ commodity.name }}</option>	
					</select>
					<br>
					<input type="text" ng-model="position.notes">			
				</td>
				<!-- Quantity -->
				<td ng-if="! position.editing"> {{ position.quantity }}</td>
				<td ng-if="position.editing"> <input type="number" ng-model="position.quantity"> </td>
				
				<!-- Price-->
				<td class="price"> {{ numberSplitted(position.price) }}</td>
<!-- 				<td ng-if="! position.editing" class="price"> {{ numberSplitted(position.price) }}</td>
				<td ng-if="position.editing"> <input type="number" ng-model="position.price"> </td> -->


				<!-- Amount -->
				<td class="price"> {{ numberSplitted(position.quantity * position.price) }}</td>

				<!-- Actions -->
				<td>
					<button class="btn btn-primary" ng-disabled="editingMode && ! position.editing" ng-if="! position.editing" ng-click="modifyPosition(position.id)">Edit</button> 
					<button class="btn btn-warning" ng-disabled="editingMode && ! position.editing" ng-if="! position.editing" ng-click="removePosition(position)">Remove</button> 
					<button class="btn btn-primary" ng-if="position.editing" ng-click="savePosition(position)">{{ position.new ? "Save" : "Update" }}</button> 
					<button class="btn btn-warning" ng-if="position.editing" ng-click="restorePosition(position)">Don&#39;t Save</button> 
				</td>
			</tr>
		</tbody>
	</table>
</div>
