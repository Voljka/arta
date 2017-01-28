<div class="page-filter">
	<button class="btn btn-info" ng-click="add()">Add</button>
	<button class="btn btn-info" ng-if="currentReport" ng-click="edit()">Update</button>
	<button class="btn btn-info" ng-if="currentReport" ng-click="delete()">Delete</button>
	<button class="btn btn-info" ng-if="currentReport && currentReport.visits_count > 0" ng-click="sendReport()">Send Report</button>
	<button class="btn btn-info" ng-click="showNotReported()">{{ notReportedOnly ? "Show All" : "Show not Reported"}}</button>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Visit Date</td>
				<td>Manager</td>
				<td>Visits</td>
				<td>Report Date</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="report.selected ? 'item-selected' : ''" ng-repeat="report in reports" ng-click="select(report)">
				<td> {{ report.visited_at.substr(0,10) }}</td>
				<td> {{ report.lastname }}</td>
				<td> {{ report.visits_count }}</td>
				<td> {{ report.reported_at.substr(0,10) }}</td>
			</tr>
			
		</tbody>
	</table>
</div>