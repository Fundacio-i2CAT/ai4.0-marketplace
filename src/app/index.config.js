(function() {
  'use strict';

  angular
    .module('marketplace')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, localStorageServiceProvider, usSpinnerConfigProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //set localStorage configuration
    localStorageServiceProvider
        .setPrefix('mkp')
        .setStorageType('sessionStorage') //available: sessionStorage and localStorage
        .setNotify(true, true);

    //$http, $httpProvider
    /*$httpProvider.defaults.headers.common['Set-Cookie'] = 'anella=';
    console.log($httpProvider);*/

    // toastr / Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 1500;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.newestOnTop = true,
    toastrConfig.maxOpened = 5;
    toastrConfig.progressBar = false;





    //spinner
    usSpinnerConfigProvider.setDefaults({color: 'blue'});
  }
})();
