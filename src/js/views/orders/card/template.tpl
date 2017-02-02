<div class="page-content">
	<div class="panel panel-info">
		<div class="panel-heading">
			Клиент
		</div>

		<div class="panel-body">
			<div class="row">
				<input ng-model="filters.consumer" type="text" ng-change="useConsumerFilter()" placeholder="Фильтр клиентов">
				<br>
				<div class="col-md-9">
					<div class="input-group">
						<span class="input-group-addon"> Выберите заказчика	</span>
						<select class="form-control" ng-change="changeConsumer()" ng-model="consumerList" ng-init="consumerList=currentConsumer">   
							<option ng-repeat="consumer in consumers" ng-value="consumer.id">{{ consumer.name }}</option>
						</select>
					</div>
				</div>
				<div class="col-md-3" ng-if="fullConsumer.is_vip == 1">
					<center class="vip-caption"> VIP </center>
				</div>	
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="input-group">
						<span class="input-group-addon">
							Местонахождение:							
						</span>
						<span class="form-control">
							{{ fullConsumer.place }}			
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="panel panel-info">
		<div class="panel-heading">
			Заказ
		</div>
		<div class="panel-body">
			<div class="row">
				<div class="col-md-4">
					<div class="input-group">
						<span class="input-group-addon">Дата отгрузки: </span>
						<input class="form-control" type="date" ng-model="deliveryDate" ng-change="checkForSaveNeedings()">
					</div>
				</div>
				<div class="col-md-4">
					<div class="input-group">
						<span class="input-group-addon">Самовывоз </span>
						<input class="form-control" type="checkbox" ng-model="self_delivery" ng-change="changeSelfDelivery()">
					</div>
				</div>
				<div class="col-md-4">
					<div class="input-group">
						<span class="input-group-addon">Форма: </span>
						<select class="form-control" ng-model="formSelect" ng-init="formSelect=currentForm" ng-change="checkForSaveNeedings()">   
							<option value="1"> Форма 1 </option>
							<option value="2"> Форма 2 </option>
						</select>
					</div>	
				</div>
			</div>
			<br>
			<div class="row">
				<center>
					<button class="btn btn-info" ng-if="! editingMode" ng-click="add()">Добавить товар</button>
					<button ng-if="toBeSaved && ! editingMode" class="btn btn-info" ng-click="saveOrder()">Сохранить заказ</button>
				</center>
			</div>
			<br>
			<div class="row">
				<table class="table table-bordered">
					<thead>
						<tr>
							<td>Товар</td>
							<td>Кол-во</td>
							<td ng-class="priceType==2 ? 'price2' : ( priceType==1 ? 'price1' : '')">Цена (Тип  {{priceType}})</td>
							<td>Сумма</td>
							<td>Действия</td>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<td colspan="3">
								<b><center>ИТОГО</center></b>
							</td>
							<td class="price">
								<b>{{ numberSplitted(orderSum()) }}</b>
							</td>
						</tr>
					</tfoot>
					<tbody>
						<tr ng-repeat="position in positions">
							<!-- Commodity-->
							<td ng-if="! position.editing"> {{ position.commodity_name }} <p class="commodity-note" ng-if="position.notes.length > 1"> <b>Примечание: </b> {{position.notes}}</p></td>
							<td ng-if="position.editing">

								<input ng-model="filters.commodity" type="text" ng-change="useFilter(position)" placeholder="Фильтр продуктов">
								<br>
								<div class="input-group commodity-select">
									<span class="input-group-addon">Товар: </span>
									<select class="form-control" ng-change="changeCommodity(position)"  ng-model="position.commodity"> 
<!-- 									<select class="form-control" ng-change="changeCommodity(position)" ng-style="comSelect" ng-model="position.commodity">    -->
										<option ng-repeat="commodity in commodities" ng-value="commodity.id">{{ commodity.name }}</option>	
									</select>
								</div>	
								<div class="input-group">
									<span class="input-group-addon">Заметка: </span>
									<input class="form-control commodity-note" type="text" ng-model="position.notes">			
<!-- 									<input class="form-control" ng-style="comNotes" type="text" ng-model="position.notes">			 -->
								</div>	
							</td>
							<!-- Quantity -->
							<td ng-if="! position.editing"> {{ position.quantity }}</td>
							<td ng-if="position.editing"> <input class="commodity-quantity-input" type="number" min="1" ng-model="position.quantity"> </td>
<!-- 							<td ng-if="position.editing"> <input ng-style="comQuantity" type="number" min="1" ng-model="position.quantity"> </td> -->
							
							<!-- Price-->
							<td class="price"> {{ position.commodity ? numberSplitted(position.price) : "0" }}</td>

							<!-- Amount -->
							<td class="price"> {{ position.commodity ? numberSplitted(position.quantity * position.price) : 0 }}</td>

							<!-- Actions -->
							<td>
								<button class="btn btn-primary" ng-disabled="editingMode && ! position.editing" ng-if="! position.editing" ng-click="modifyPosition(position.id)">Изменить</button> 
								<button class="btn btn-warning" ng-disabled="editingMode && ! position.editing" ng-if="! position.editing" ng-click="removePosition(position)">Удалить</button> 
								<button class="btn btn-primary" ng-if="position.editing && commodities.length > 0" ng-click="savePosition(position)">{{ position.new ? "Сохр" : "Обновить" }}</button> 
								<button class="btn btn-warning" ng-if="position.editing" ng-click="restorePosition(position)">Не сохр</button> 
							</td>
						</tr>
					</tbody>
				</table>
			</div>	
		</div>
	</div>
</div>
