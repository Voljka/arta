<div class="row">
	<div class="col-md-6">
		<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Фильтр">
		<br>
		<button class="btn btn-info" ng-click="add()">Добавить клиента</button>
		<button class="btn btn-info" ng-if="currentConsumer" ng-click="edit()">Изменить клиента</button>
	<!-- <button class="btn btn-info" ng-if="currentConsumer" ng-click="delete()">Удалить клиента</button> -->
	</div>
	<div class="col-md-6">
		<button class="btn btn-info" ng-if="currentConsumer" ng-click="sendPrice()">Отправить прайс</button>
		<button class="btn btn-info" ng-disabled="false" ng-click="sendPriceAll()">Разослать прайс всем</button>
	</div>
</div>

<div class="row">
	<flash-message>
		<div class="flash-div">{{ flash.text}}</div>
	</flash-message>
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
				<!-- <td>Менеджер</td> -->
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
				<!-- <td> {{ consumer.worker_name }}</td> -->
				<!-- <td> {{ consumer.notes }}</td> -->
			</tr>
			
		</tbody>
	</table>
</div>