<div class="row">
	<div class="col-md-8">
		<button class="btn btn-info" ng-click="showTomorrows()">{{ onlyTomorrow ? "Показать все" : "Показать только поставки завтра"}}</button>
	</div>
	<div class="col-md-4" ng-if="onlyTomorrow && orders.length > 0">
		<button class="btn btn-info" ng-click="sendReport()">Отправить отчет</button>
		<span>Только себе <input type="checkbox" ng-model="obj.selfMailing"> </span>
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
				<td>Дата доставки</td>
				<td>Отчет отправлен</td>
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