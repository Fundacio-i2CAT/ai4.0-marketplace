(function() {
  'use strict';

  angular
    .module('marketplace')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //set localStorage configuration
    localStorageServiceProvider
        .setPrefix('mkp')
        .setStorageType('localStorage') //available: sessionStorage and localStorage
        .setNotify(true, true);

    //$http
    /*$httpProvider.defaults.headers.common.algo = 'your_token';
    console.log($httpProvider);*/


    // toastr / Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 4000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.newestOnTop = true,
    toastrConfig.maxOpened = 5;
    toastrConfig.progressBar = true;
  }


})();
