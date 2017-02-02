'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';


function VisitReportCtrl($scope, $state, reportList, Flash, VisitService){

	$scope.notReportedOnly = false;

	$state.currentReport = VisitService.currentReport();
	$scope.selfMailing = false;
	
	reportList.map( function(report) {
		report.lastname = toUnsafeString( report.lastname );
		return report;
	})

	filterObjects(); 

	$scope.select = function(report) {

		$scope.reports = _.map($scope.reports, function(c) {
			if (c.id === report.id) {
				if (VisitService.currentReport() == report) {
					VisitService.selectReport(undefined);
					c.selected = false;
					return c;
				} else {
					VisitService.selectReport(report);
					c.selected = true;
					return c;
				}
			} else {
				c.selected = false;
				return c;
			}
		})

		$scope.currentReport = VisitService.currentReport();
	}

	$scope.showNotReported = function() {
		$scope.notReportedOnly = ! $scope.notReportedOnly;
		filterObjects();
	}

	$scope.sendReport = function() {

		var manager = 1;

		VisitService.sendReport(Number($scope.selfMailing))
			.then( function(respond) {
				console.log(respond);

		        var message = '<strong>Отчет о маршрутизации успешно отправлен!</strong>';
		        var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);

				// save Order as Reported
				if (! $scope.selfMailing) {
					return VisitService.reported()
						.then( function(reportedDate) {
							VisitService.allReports()
								.then( function(data) {
									reportList = data;
									filterObjects();
								})

							$scope.currentReport = undefined;

							VisitService.selectReport(undefined);
						})
				}
			})
	}

	$scope.add = function() {
		$state.go('visit_report_add');
	}

	$scope.edit = function() {
		$state.go('visit_report_modify');
	}

	$scope.delete = function() {
		VisitService.delete($scope.currentReport.id)
			.then( function(data) {
				console.log(data);
				VisitService.allReports()
					.then( function(data) {
						reportList = data;

						reportList.map( function(report) {
							report.lastname = toUnsafeString( report.lastname );
							return report;
						})						
						filterObjects();
					})
			}) ;
	}

	function filterObjects() {
		if ($scope.notReportedOnly) {
			$scope.reports = _.filter( reportList, function(o){
				return o.reported_at == null;
			})
		} else {
			$scope.reports = reportList;
		}
	}

	function formattedDate(dat){
		var curr_date = dat.getDate();
		var curr_month = dat.getMonth() + 1;
		var curr_year = dat.getFullYear();

		return (curr_year + "-" + (curr_month < 10 ? "0"+curr_month : curr_month ) + "-" + (curr_date < 10 ? "0"+curr_date : curr_date ));
	}
}

module.exports = VisitReportCtrl; 