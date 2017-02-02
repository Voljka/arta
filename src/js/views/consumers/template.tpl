<div class="page-filter">
	<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Фильтр">
	<br>
	<button class="btn btn-info" ng-click="add()">Добавить клиент</button>
	<button class="btn btn-info" ng-if="currentConsumer" ng-click="edit()">Изменить клиента</button>
	<!-- <button class="btn btn-info" ng-if="currentConsumer" ng-click="delete()">Удалить клиента</button> -->
</div>
<div class="consumers-div">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Название клиента</td>
				<td>Район</td>
				<td>Адрес</td>
				<td>Представители</td>
				<td>Mail</td>
				<td>Менеджер</td>
<!-- 				<td></td> -->
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
				<!-- <td> {{ consumer.notes }}</td> -->
			</tr>
			
		</tbody>
	</table>
</div>