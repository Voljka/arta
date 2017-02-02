'use strict';

var API_SERVER = 'php/visits';
var REPORT_API = 'php/reports';

var current;

function Service($http) {

  function allReports() {
    return $http
      .get(API_SERVER + '/getAllReports.php', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function allVisits(reportId) {
    return $http
      .get(API_SERVER + '/getAllVisits.php?report=' + reportId, { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function saveReport(data) {

    return $http
      .post(API_SERVER + '/saveReport.php', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function removeReport(reportId) {

    console.log('Trying to delete report # ' + reportId);
    return $http
      .post(API_SERVER + '/removeReport.php', {id: reportId})
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function sendReport(selfMailing) {
    console.log('sending Mailing ' + selfMailing);

    return $http
      .get(REPORT_API+ '/route.php?mailing='+selfMailing)
      // .post(REPORT_API+ '/route.php', {mailing: selfMailing})
      .then(function (result) {
        console.log('Visit Report Successfully sent');
        return result.data;
      })
      .catch(function () {
        console.log('Error');
        return undefined;
      });
  }

  function currentReport(){
    return current;
  }

  function selectReport(selectedObject) {
    current = selectedObject;
  }

  function reported() {
    return $http
      .post(API_SERVER+ '/reported.php', {id: 1})
      .then(function (data) {
        console.log(data);
        console.log('Report saved in DB as reported');
        return data.data;
      })
      .catch(function () {
        console.log('Error dutring save order as reported');
        return undefined;
      });    
  }

  return {
    allReports   : allReports,
    allVisits: allVisits,
    saveReport : saveReport,
    currentReport    : currentReport,
    selectReport  : selectReport,
    sendReport       : sendReport,
    reported: reported,
    delete : removeReport,
  };
}

module.exports = Service;