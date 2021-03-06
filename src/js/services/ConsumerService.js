'use strict';

var API_SERVER = 'php/consumers';
var REPORT_API = 'php/reports';

var current;

function ConsumerService($http) {

  function getAll() {
    return $http
      .get(API_SERVER + '/getAll.php', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {

    return $http
      .post(API_SERVER + '/add.php', data, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
       })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(data) {
    return $http
      .post(API_SERVER + '/update.php', data, {
         transformRequest: angular.identity,
         headers: {'Content-Type': undefined}
       })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function saveOrder(data) {
    return $http
      .post(API_SERVER + '/save_order.php', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
  }

  function getCurrent(){
    return current;
  }

  function select(selectedObject) {
    current = selectedObject;
  }

  function sendPrice(id){
    var data = {};
    if (id) {
      data.id = id;
      return $http
        .post(REPORT_API + '/price_mailing.php', data)
        .then(function (data) {
          return data.data;
        })
        .catch(function () {
          return undefined;
        });
    } else {
      return $http
        .post(REPORT_API + '/price_mailing.php', data)
        .then(function (data) {
          return data.data;
        })
        .catch(function () {
          return undefined;
        });
    }
  }

  return {
    all     : getAll,
    current : getCurrent,
    select     : select,
    add        : add,
    update     : update,
    delete     : remove,    
    saveOrder  : saveOrder,
    sendPrice  : sendPrice,

  };
}

module.exports = ConsumerService;