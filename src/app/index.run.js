(function() {
  'use strict';

  angular
    .module('marketplace')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');

    // if (user) $http.defaults.headers.common.Authorization = 'anella=' + user.session_id;
    // if (user) $http.defaults.headers.common['Set-Cookie'] += user.session_id;

  }

})();
