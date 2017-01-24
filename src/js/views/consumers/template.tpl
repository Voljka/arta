<div class="page-filter">
	<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Consumer name filter">
	<br>
	<button class="btn btn-info" ng-click="add()">Add</button>
	<button class="btn btn-info" ng-if="currentConsumer" ng-click="edit()">Update</button>
	<button class="btn btn-info" ng-if="currentConsumer" ng-click="delete()">Delete</button>
<!-- 	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goContract()">Contracts</button>
	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goPayments()">Payments</button>
	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goDeliveries()">Deliveries</button> -->
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Name</td>
				<td>Region</td>
				<td>Place</td>
				<td>Representatives</td>
				<td>Mail</td>
				<td>Manager</td>
				<td>Notes</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="consumer.selected ? 'item-selected' : ''" ng-repeat="consumer in filteredObjects" ng-click="select(consumer)">
				<td> {{ consumer.name }}</td>
				<td> {{ consumer.region_name }}</td>
				<td> {{ consumer.place }}</td>
				<td> {{ consumer.representatives }}</td>
				<td> {{ consumer.mail }}</td>
				<td> {{ consumer.worker_name }}</td>
				<td> {{ consumer.notes }}</td>
			</tr>
			
		</tbody>
	</table>
</div>