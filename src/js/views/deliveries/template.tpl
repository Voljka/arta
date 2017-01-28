<div class="page-filter">
<!-- 	<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Consumer name filter">
	<br> -->
	<button class="btn btn-info" ng-if="onlyTomorrow" ng-click="sendReport()">Send Report</button>
	<button class="btn btn-info" ng-click="showTomorrows()">{{ onlyTomorrow ? "Show All not Reported" : "Show tomorrow deliveries"}}</button>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Consumer</td>
				<td>Order Date</td>
				<td>Sum</td>
				<td>Manager</td>
				<td>Delivery Date</td>
				<td>Reported</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="order in orders">
				<td> {{ order.consumer_name }}</td>
				<td> {{ order.ordered_at }}</td>
				<td class="price"> {{ numberSplitted( order.order_sum ) }}</td>
				<td> {{ order.manager_name }}</td>
				<td> {{ order.planned_delivery_at }}</td>
				<td> {{ order.position_reported_at ? 'Yes' : '' }}</td>
			</tr>
			
		</tbody>
	</table>
</div>