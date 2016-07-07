(function() {
  'use strict';

  angular
    .module('marketplace')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http) {

    $log.debug('runBlock end');
    // $http.defaults.headers.common.Authorization = 'holaaaaa';


  }

})();
