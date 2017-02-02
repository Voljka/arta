'use strict';

var API_SERVER = 'php/tt_types';

var current;

function TTTypeService($http) {

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

  return {
    all     : getAll,
  };
}

module.exports = TTTypeService;