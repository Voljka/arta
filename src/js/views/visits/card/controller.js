'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../../libs/strings';

// function VisitCardCtrl($scope, $state, consumerList, reportList, visitList, regionList, planList, VisitService, Notification) {
function VisitCardCtrl($scope, $state, consumerList, reportList, visitList, regionList, planList, VisitService, Flash) {

	//Notification.primary('We are entered');


	consumerList.map( function(consumer) {
		var name = toUnsafeString( consumer.name );
		var place = toUnsafeString( consumer.place );
		var representatives = toUnsafeString( consumer.representatives );
		var notes = toUnsafeString( consumer.notes );

		Object.assign(consumer, 
					{ 
						name: name,
						representatives: representatives, 
						place: place, 
						notes: notes,
						route_order_id: Number(consumer.route_order_id)
					});
		
		return consumer;
	})

	consumerList = _.sortBy( consumerList, ['route_order_id']);

	$scope.currentReport = ($state.current.name == 'visit_report_add') ? undefined : VisitService.currentReport();

	visitList.map( function(o){
		o.consumer_name = toUnsafeString( o.consumer_name)
		o.place = toUnsafeString( o.place)
	})

	$scope.visits = ($state.current.name == 'visit_report_add') ? [] :visitList;
	$scope.regionSelectable = ($state.current.name == 'visit_report_add') ? false : true;

	$scope.regions = regionList;

	var idCounter = 1000000000000;

	$scope.visitDate = ($state.current.name == 'visit_report_add') ? new Date() : new Date($scope.currentReport.visited_at.substr(0,10));

	var visitChanges = {
		added: [],
		deleted: [],
		worker: 1,
		report: $state.current.name == "visit_report_modify" ? $scope.currentReport.id : "new",
	}

	$scope.toBeSaved = false;

	var todayDay = (new Date()).getDay() == 0 ? 7 : (new Date()).getDay();
	var plan = _.find( planList, function(o) {
		return o.delivery_day == todayDay;
	});

	$scope.selectedRegion = plan ? plan.region : planList[0].region;

	filterObjects(); 

	$scope.useFilter = function(){
		// filterObjects();

		// if ($scope.consumers.length > 0) {
		// 	$scope.selectedConsumer = $scope.consumers[0].id;
		// }
	}

	function filterObjects() {
		// $scope.consumers = _.filter( consumerList, function(o) {
		// 	return (o.region == $scope.selectedRegion) 
		// }) 
	}

	function getCounter(){
		idCounter++;
		return idCounter;
	}

	$scope.makeReport = function() {
		$scope.consumers = _.filter( consumerList, function(o) {
			return (o.region == $scope.selectedRegion) 
		})
		$scope.consumers.forEach( function(consumer) {

			var newVisit = {};

			newVisit.new = true;
			newVisit.id = getCounter();
			
			var addingConsumer = _.find( consumerList, {id: consumer.id});
			
			newVisit.consumer = addingConsumer.id;
			newVisit.consumer_name = addingConsumer.name;
			newVisit.place = addingConsumer.place;
			newVisit.region = $scope.selectedRegion;;

			$scope.visits.push(newVisit);

			$scope.toBeSaved = true;

			visitChanges.added.push(newVisit);
		})

        // var message = '<strong>Well done!</strong> You successfully read this important alert message.';
        // var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
    }

	$scope.removeVisit = function(visit) {
		if (! visit.new) {
			visitChanges.deleted.push(visit.id);
			$scope.toBeSaved = true;
		} else {
			visitChanges.added = visitChanges.added.filter( function(o) {
				return o.id != visit.id;
			})
		}

		$scope.visits = _.filter($scope.visits, function(o){
			return o.id != visit.id;
		});
	}

	$scope.saveReport = function() {

		var sameReports = _.filter( reportList, function(o){
			return ( o.visited_at.substr(0,10) == (formattedDate( $scope.visitDate )) && 
					 o.worker == 1)
		})
		
		// if report already exist 
		if ( $state.current.name == "visit_report_add" && sameReports.length > 0 ) {
			alert('Отчет для данного представителя за указанный день уже существует');
		} else {
			visitChanges.visited_at = ($state.current.name == "visit_report_modify" ? $scope.currentReport.visited_at : formattedDate( $scope.visitDate ) ); 
			console.log('Saving Report changes: ');
			console.log(visitChanges);

			VisitService.selectReport(undefined);

			VisitService.saveReport(visitChanges)
				.then( function(data){
					$state.go('visits');
				})		

		}
	}

	$scope.numberSplitted = function(num)  {
		num = Number(num).toFixed(2);
		return String(num).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
	}

	function formattedDate(dat){
		var curr_date = dat.getDate();
		var curr_month = dat.getMonth() + 1;
		var curr_year = dat.getFullYear();

		return (curr_year + "-" + (curr_month < 10 ? "0"+curr_month : curr_month ) + "-" + (curr_date < 10 ? "0"+curr_date : curr_date ));
	}
}

module.exports = VisitCardCtrl; 
