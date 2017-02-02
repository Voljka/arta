<div class="page-filter">
	<input ng-model="textFilter" type="text" ng-change="useFilter()" placeholder="Фильтр">
	<br>
	<br>
	<button class="btn btn-info" ng-click="add()">Добавить товар</button>
	<button class="btn btn-info" ng-if="currentCommodity" ng-click="edit()">Изменить товар</button>
	<!-- <button class="btn btn-info" ng-if="currentCommodity" ng-click="delete()">Удалить товар</button> -->
<!-- 	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goContract()">Contracts</button>
	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goPayments()">Payments</button>
	<button class="btn btn-default" ng-if="currentCommodity" ng-cilck="goDeliveries()">Deliveries</button> -->
</div>
<br>

<div class="page-content">
	<table class="table table-bordered">
		<thead>
			<tr>
				<td>Товар</td>
				<td>Цена 1</td>
				<td>Цена 2</td>
				<td>Цена 3</td>
				<td>Старый</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-class="commodity.selected ? 'item-selected' : ''" ng-repeat="commodity in filteredObjects" ng-click="select(commodity)">
				<td> {{ commodity.name }}</td>
				<td class="price"> {{ numberSplitted(commodity.price1) }}</td>
				<td class="price"> {{ numberSplitted(commodity.price2) }}</td>
				<td class="price"> {{ numberSplitted(commodity.price3) }}</td>
				<td> <center>{{ commodity.is_old == 1 ? 'Да' : '' }}</center></td>
			</tr>
		</tbody>
	</table>
</div>