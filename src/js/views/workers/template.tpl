<div class="page-filter">
	<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Commodity name filter">
	<br>
	<button class="btn btn-info" ng-click="add()">Add</button>
	<button class="btn btn-info" ng-if="currentCommodity" ng-click="edit()">Update</button>
	<button class="btn btn-info" ng-if="currentCommodity" ng-click="delete()">Delete</button>
<!-- 	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goContract()">Contracts</button>
	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goPayments()">Payments</button>
	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goDeliveries()">Deliveries</button> -->
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Name</td>
				<td>Price 1</td>
				<td>Price 2</td>
				<td>Price 3</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="commodity.selected ? 'item-selected' : ''" ng-repeat="commodity in filteredObjects" ng-click="select(commodity)">
				<td> {{ commodity.name }}</td>
				<td class="price"> {{ numberSplitted(commodity.price1) }}</td>
				<td class="price"> {{ numberSplitted(commodity.price2) }}</td>
				<td class="price"> {{ numberSplitted(commodity.price3) }}</td>
			</tr>
			
		</tbody>
	</table>
</div>