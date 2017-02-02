<div class="row">
	<div class="col-md-9">
		<div class="input-group">
			<span class="input-group-addon">Район : </span>
			<select class="form-control" ng-change="selectRegion()" ng-model="selectedRegion">   
				<option ng-repeat="region in regions" ng-value="region.id">{{ region.name }}</option>
			</select>
		</div>
	</div>
	<div class="col-md-3">
		<button class="btn btn-primary" ng-click="saveOrder()">
			Сохранить маршрут
		</button>
	</div>
</div>

<flash-message>
	<div class="flash-div">{{ flash.text}}</div>
</flash-message>

<div class="row">
	<div class="col-md-12 dropzone">
		<ul dnd-list="consumers"
	        dnd-horizontal-list="true"
	        dnd-effect-allowed="move"
	        dnd-external-soures="true"
            class="itemlist"
		>
 		    <li alt="{{consumer.name}}" ng-repeat="consumer in consumers"
		        dnd-draggable="consumer"
		        dnd-effect-allowed="move"
		        dnd-moved="consumers.splice($index, 1)"
		        >
		        {{ consumer.name}}
		    </li>
		</ul>
	</div>
</div>