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
        .setPrefix('mkplace')
        .setStorageType('localStorage') //available: sessionStorage and localStorage
        .setNotify(true, true);

    //$http
    /*$httpProvider.defaults.headers.common.algo = 'your_token';
    console.log($httpProvider);*/
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    $httpProvider.interceptors.push(function() {
        return {
         'request': function(config) {
              config.headers['Set-Cookie'] = 'asdfasdfasdfasdfasdf';
              return config;
          }
        };
    });


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
