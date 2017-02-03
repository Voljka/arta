<div class="row">
	<div class="col-md-12">
		<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Фильтр">
	</div>
</div>
<div class="row">
	<div class="col-md-7">
		<button class="btn btn-info" ng-click="add()">Добавить заказ</button>
		<button class="btn btn-info" ng-if="currentOrder && filteredObjects.length > 0" ng-click="edit()">Изменить заказ</button>
		<button class="btn btn-info" ng-click="showNotReported()">{{ notReportedOnly ? "Показать все заказы" : "Показать только неотправленные"}}</button>
	</div>
	<div class="col-md-5" ng-if="currentOrder && filteredObjects.length > 0">
		<button class="btn btn-info" ng-click="sendReport()">Отправить заказ</button>
		<span>Только себе <input type="checkbox" ng-model="obj.selfMailing"> </span>
		<button class="btn btn-danger" ng-click="delete()">Удалить заказ</button>
	</div>

</div>
<br>
<div class="row">
	<flash-message>
		<div class="flash-div">{{ flash.text}}</div>
	</flash-message>
</div>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Клиент</td>
				<td>Дата заказа</td>
				<td>Сумма</td>
				<td>Менеджер</td>
				<td>Дата отправки<br>отчета</td>
				<td>Самовывоз</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="order.selected ? 'item-selected' : ''" ng-repeat="order in filteredObjects" ng-click="select(order)">
				<td> {{ order.consumer_name }}</td>
				<td> {{ order.ordered_at }}</td>
				<td class="price"> {{ numberSplitted( order.order_sum ) }}</td>
				<td> {{ order.manager_name }}</td>
				<td> {{ order.reported_at }}</td>
				<td> {{ order.self_delivery == 1 ? "Да" : ""  }}</td>
			</tr>
			
		</tbody>
	</table>
</div>