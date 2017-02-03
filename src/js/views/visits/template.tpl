<div class="row">
	<div class="col-md-8">
		<button class="btn btn-info" ng-click="add()">Добавить отчет</button>
		<button class="btn btn-info" ng-if="currentReport" ng-click="edit()">Изменить отчет</button>
		<button class="btn btn-info" ng-click="showNotReported()">{{ notReportedOnly ? "Показать все" : "Показать неотравленные"}}</button>
		<button class="btn btn-danger" ng-if="currentReport" ng-click="delete()">Удалить отчет</button>
	</div>
	<div class="col-md-4">
		<button class="btn btn-info" ng-click="sendReport()">Отправить отчет</button>	<span>Только себе <input type="checkbox" ng-model="selfMailing"> </span>
	</div>
</div>
<br>

<flash-message>
	<div class="flash-div">{{ flash.text}}</div>
</flash-message>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Дата посещения</td>
				<td>Менеджер</td>
				<td>Кол-во посещенных</td>
				<td>Дата отправки отчета</td>
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