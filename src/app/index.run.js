(function() {
  'use strict';

  angular
    .module('marketplace')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
