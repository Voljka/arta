<div class="panel panel-info">
	<div class="panel-heading">
		Параметры отчета
	</div>
	<div class="panel-body">
		<div class="row">
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">Дата визита : </span>
					<input class="form-control" type="date" ng-model="visitDate">
				</div>
			</div>
			<div class="col-md-4">
				<div class="input-group">
					<span class="input-group-addon">Район : </span>
					<select class="form-control" ng-disabled="{{regionSelectable}}" ng-change="useFilter()" ng-model="selectedRegion">   
						<option ng-repeat="region in regions" ng-value="region.id">{{ region.name }}</option>
					</select>
				</div>
			</div>
			<div class="col-md-4">
				<center>
					<button class="btn btn-info" ng-click="makeReport()" ng-if="visits.length == 0">Сформировать отчет</button>
					<button ng-if="toBeSaved" class="btn btn-info" ng-click="saveReport()">Сохранить отчет</button>
				</center>	
			</div>	
		</div>
	</div>
</div>

<flash-message>
	<div class="flash-div">{{ flash.text}}</div>
</flash-message>

<div class="panel panel-info">
	<div class="panel-heading">
		Список посещенных клиентов
	</div>
	<div class="panel-body">
		<table class="table table-bordered">
			<thead>
				<tr>
					<td>Клиент</td>
					<td>Адрес</td>
					<!-- <td>Представитель</td> -->
					<td>Контакты</td>
					<td>Действия</td>
				</tr>
			</thead>
			<tbody>
				<tr ng-repeat="visit in visits">
					<td> {{ visit.consumer_name }}</td>
					<td> {{ visit.place }}</td>
					<!-- <td> {{ visit.person }}</td> -->
					<td> {{ visit.representatives }}</td>
					<td> <button class="btn btn-warning" ng-click="removeVisit(visit)">Удалить</button> </td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
