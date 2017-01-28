'use strict';
var _ = require('lodash');
import { toSafeString, toUnsafeString } from '../../libs/strings';


function VisitReportCtrl($scope, $state, reportList, VisitService){

	$scope.notReportedOnly = false;

	$state.currentReport =  ($state.current.name == 'visit_report_add') ? undefined : VisitService.currentReport();
	
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

		var startDate = '2017-01-23',
			manager = 1;

		VisitService.sendReport(startDate, manager)
			.then( function(respond) {
				// save Order as Reported
				return VisitService.reported();
			})
			.then( function(reportedDate) {
				$scope.reports.map( function(report) {
					if ($scope.currentReport.id == report.id) {
						report.reported_at = reportedDate;
						report.selected = false;
					}

					return report;
				})

				$scope.currentReport = undefined;

				VisitService.select(undefined);
			})
	}

	$scope.add = function() {
		$state.go('visit_report_add');
	}

	$scope.edit = function() {
		$state.go('visit_report_modify');
	}

	$scope.delete = function() {
		OrderService.delete();
	}

	function filterObjects() {
		if ($scope.notReportedOnly) {
			$scope.reports = _.filter( reportList, function(o){
				return ! o.reported_at;
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