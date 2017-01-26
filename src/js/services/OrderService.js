'use strict';

var API_SERVER = 'php/orders';

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

  function getAllDetailed() {
    return $http
      .get(API_SERVER + '/getAllDetailed.php', { cache: false })
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

  function save(data) {
    data = JSON.stringify(data);
    return $http
      .post(API_SERVER + '/save.php', data/*, { headers: {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}}*/)
      .then(function (data) {
        console.log('Success');
        console.log(data.dada);
        return data.data;
      })
      .catch(function () {
        console.log('Error');
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

  return {
    all        : getAll,
    allDetailed: getAllDetailed,
    current    : getCurrent,
    select     : select,
    add        : add,
    update     : update,
    delete     : remove,
    save       : save,
  };
}

module.exports = Service;