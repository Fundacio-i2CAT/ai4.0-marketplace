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
        templateUrl: 'app/main/main.html', controller: 'MainController', controllerAs: 'main'
      })
      .state('catalog', {
        url: '/catalog',
        templateUrl: 'app/catalog/index.tpl.html', controller: 'CatalogController', controllerAs: 'catalog'
      })
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/projects/index.tpl.html', controller: 'ProjectController', controllerAs: 'projects'//, need: 'provider'
      })
      .state('provprojects', {
        url: '/provprojects',
        templateUrl: 'app/projects/provider/index-prov.tpl.html', controller: 'ProjectController', controllerAs: 'provprojects'
      })
      .state('clientprojects', {
        url: '/clientprojects',
        templateUrl: 'app/projects/client/index-client.tpl.html', controller: 'ProjectController', controllerAs: 'clientprojects'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'app/services/index.tpl.html', controller: 'ServiceController', controllerAs: 'services'//, need: 'client'
      })
      .state('service-edit', {
        url: '/services/edit/:id',
        templateUrl: 'app/services/edit.tpl.html', controller: 'ServiceEditController', controllerAs: 'editservice'
      })
      .state('provinstances', {
        url: '/provinstances',
        templateUrl: 'app/projects/provider/provinstances.tpl.html', controller: 'ProvInstancesController', controllerAs: 'provinstances'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.tpl.html', controller: 'LoginController', controllerAs: 'login'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'app/login/register.tpl.html', controller: 'LoginController', controllerAs: 'login'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.tpl.html', controller: 'UserController', controllerAs: 'users'
      })
      .state('tatami', {
        url: '/tatami',
        templateUrl: 'app/tatami/tatami.tpl.html', controller: 'TatamiController', controllerAs: 'tatami'
      });

      $urlRouterProvider.otherwise('/');
  }    


  angular
    .module('marketplace')
    .run(setStatePermission)

    function setStatePermission ($rootScope, $state, CurrentUserFactory){
          var allowView = $rootScope.$on('$stateChangeStart', function(event, destiny) {
            var userRole = CurrentUserFactory.getRole();
            if (destiny.need && userRole !== destiny.need) {
              event.preventDefault();
              $state.go('tatami');
            }
          });

          allowView();
    }
    
})();
