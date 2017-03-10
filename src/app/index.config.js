(function() {
  'use strict';

  angular
    .module('marketplace')
    .config(config)
    .config(securithation);

  /** @ngInject */
  function config($logProvider, toastrConfig, localStorageServiceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    //set localStorage configuration
    localStorageServiceProvider
        .setPrefix('mkp')
        .setStorageType('localStorage') //available: sessionStorage and localStorage
        .setNotify(true, true);

    //$http, $httpProvider
    /*$httpProvider.defaults.headers.common['Set-Cookie'] = 'anella=';
    console.log($httpProvider);*/

    // toastr / Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 5000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.newestOnTop = true,
    toastrConfig.maxOpened = 5;
    toastrConfig.progressBar = false;
    toastrConfig.closeButton = true;

    //spinner
    // usSpinnerConfigProvider.setDefaults({color: 'orange'});
  }

  function securithation($httpProvider) {
    var user, token;
    if (window.localStorage['mkp.user']) {
      console.log(angular.fromJson(window.localStorage['mkp.user']));
      user = angular.fromJson(window.localStorage['mkp.user']);
      token = user.user.token;
      // userb = window.localStorage.user.token;
    }
    $httpProvider.defaults.headers.common['Authorization'] = token;
  }

})();
