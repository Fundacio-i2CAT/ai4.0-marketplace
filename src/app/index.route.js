(function() {
  'use strict';

  angular
    .module('marketplace')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('modulo1', {
        url: '/modulo1',
        templateUrl: 'app/modulo1/entidad.html',
        controller: 'Modulo1Controller',
        controllerAs: 'modulo1'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
