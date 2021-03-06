'use strict';

var API_SERVER = 'php/positions';

var current;

function Service($http) {

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

  function remove(id) {
  }

  function getCurrent(){
    return current;
  }

  function select(selectedObject) {
    current = selectedObject;
  }

  function byOrder(orderId) {
    return $http
      .get(API_SERVER + '/byorder.php?order=' + orderId, {
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

  function notDelivered() {
    return $http
      .get(API_SERVER + '/notdelivered.php')
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });    
  }

  return {
    all     : getAll,
    current : getCurrent,
    select     : select,
    add        : add,
    update     : update,
    delete     : remove,    
    byOrder    : byOrder,
    notDelivered: notDelivered,
  };
}

module.exports = Service;