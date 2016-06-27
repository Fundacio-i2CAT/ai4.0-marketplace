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
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/projects/index.tpl.html',
        controller: 'ProjectController',
        controllerAs: 'projects'
      })
      .state('project-edit', {
        url: '/projects/edit'/*/{id:[0-9]}*/,
        templateUrl: 'app/projects/edit.tpl.html',
        controller: 'ProjectController',
        controllerAs: 'projects'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'app/services/index.tpl.html',
        controller: 'ServiceController',
        controllerAs: 'services'
      })
      .state('service-edit', {
        url: '/services/edit'/*/{id:[0-9]}*/,
        templateUrl: 'app/services/edit.tpl.html',
        controller: 'ServiceController',
        controllerAs: 'services'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.tpl.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/login/register.tpl.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'app/user/users.tpl.html',
        controller: 'UserController',
        controllerAs: 'users'
      });

      $urlRouterProvider.otherwise('/');
  }    


})();
