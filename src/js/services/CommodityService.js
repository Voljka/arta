'use strict';

var API_SERVER = 'php/commodities';

var current;

function CommodityService($http) {

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
    // data = {
    //   group: "6734a170-d283-11e6-9cca-3f6676d6a14c",
    //   name: "Енакиевский металлургический завод",
    //   country: "461990b0-d286-11e6-b131-e3fb6e4b097e"
    // };

    return $http
      .post(API_SERVER + '/add.php', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    // data = {
    //   group: "6734a170-d283-11e6-9cca-3f6676d6a14c",
    //   name: "Енакиевский металлургический завод",
    //   country: "461990b0-d286-11e6-b131-e3fb6e4b097e"
    // };

    // id = "b5d5ae10-d390-11e6-804c-05a125667c41"; 
    return $http
      .put(API_SERVER + '/update.php' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    // id = "b5d5ae10-d390-11e6-804c-05a125667c41";

    // return $http
    //   .delete(API_SERVER + '/consumers/' + id)
    //   .then(function (data) {
    //     return data.data;
    //   })
    //   .catch(function () {
    //     return undefined;
    //   });
  }

  function getCurrent(){
    return current;
  }

  function select(selectedObject) {
    current = selectedObject;
  }

  return {
    all     : getAll,
    current : getCurrent,
    select     : select,
    add        : add,
    update     : update,
    delete     : remove,    
  };
}

module.exports = CommodityService;