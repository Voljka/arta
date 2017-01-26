<div class="page-filter">
	<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Consumer name filter">
	<br>
	<button class="btn btn-info" ng-click="add()">Add</button>
	<button class="btn btn-info" ng-if="currentOrder" ng-click="edit()">Update</button>
	<button class="btn btn-info" ng-if="currentOrder" ng-click="delete()">Delete</button>
	<button class="btn btn-info" ng-if="currentOrder && ! currentOrder.reported_at" ng-click="sendReport()">Send Report</button>
	<button class="btn btn-info" ng-click="showNotReported()">{{ notReportedOnly ? "Show All" : "Show not Reported"}}</button>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Consumer</td>
				<td>Order Date</td>
				<td>Sum</td>
				<td>Manager</td>
				<td>Report Date</td>
				<td>Form</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="order.selected ? 'item-selected' : ''" ng-repeat="order in filteredObjects" ng-click="select(order)">
				<td> {{ order.consumer_name }}</td>
				<td> {{ order.ordered_at }}</td>
				<td class="price"> {{ numberSplitted( order.order_sum ) }}</td>
				<td> {{ order.manager_name }}</td>
				<td> {{ order.reported_at }}</td>
				<td> {{ order.form }}</td>
			</tr>
			
		</tbody>
	</table>
</div>