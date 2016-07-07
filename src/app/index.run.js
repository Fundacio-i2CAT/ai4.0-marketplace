(function() {
  'use strict';

  angular
    .module('marketplace')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $http, localStorageService) {

    $log.debug('runBlock end');
    var user = localStorageService.get('user');
    console.log('desde index.run.js', user);
    //if (user) $http.defaults.headers.common.Authorization = user.session_id;

    if (user) $http.defaults.headers.common.Authorization = 'anella=' + user.session_id;
    // if (user) $http.defaults.headers.common['Set-Cookie'] += user.session_id;

  }

})();
