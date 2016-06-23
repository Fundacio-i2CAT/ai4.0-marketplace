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
        templateUrl: 'app/modulo1/index.html',
        controller: 'Modulo1Controller',
        controllerAs: 'modulo1'
      })
      .state('modulo1-edit', {
        url: '/modulo1',///{id:[0-9]{1,8}}
        templateUrl: 'app/modulo1/edit.html',
        controller: 'Modulo1Controller',
        controllerAs: 'modulo1'
      })
      .state('modulo1-add', {
        url: '/modulo1/add',
        templateUrl: 'app/modulo1/add.html',
        controller: 'Modulo1Controller',
        controllerAs: 'modulo1'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/user/login.tpl.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/user/register.tpl.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'app/user/users.tpl.html',
        controller: 'UserController',
        controllerAs: 'user'
      });

      $urlRouterProvider.otherwise('/');
  }    


})();
