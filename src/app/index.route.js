(function() {
  'use strict';

  angular
    .module('marketplace')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode({
      enabled:true
    });
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('catalog', {
        url: '/catalog',
        templateUrl: 'app/catalog/index.tpl.html',
        controller: 'CatalogController',
        controllerAs: 'catalog'
      })
      .state('provprojects', {
        url: '/provprojects',
        templateUrl: 'app/projects/provider/index-prov.tpl.html',
        controller: 'ProjectController',
        controllerAs: 'provprojects',
        need: 'User.Provider'
      })
      .state('ownprojects', {
        url: '/ownprojects',
        templateUrl: 'app/projects/provider/ownprojects/index-ownprov.tpl.html',
        controller: 'OwnProjectController',
        controllerAs: 'ownproj',
        need: 'User.Provider'
      })
      .state('publishsrv', {
        url: '/publishsrv',
        templateUrl: 'app/projects/publish_service/publishsrv.tpl.html',
        controller: 'PublishSrvController',
        controllerAs: 'publishsrv',
        need: 'User.Provider'
      })
      .state('clientprojects', {
        url: '/clientprojects',
        templateUrl: 'app/projects/client/index-client.tpl.html',
        controller: 'ProjectController',
        controllerAs: 'clientprojects'/*,
        need: 'User.Client'*/
      })
      .state('project-new', {
        url: '/clientproject/new',
        templateUrl: 'app/projects/client/project-new.tpl.html',
        controller: 'NewProjectController',
        controllerAs: 'newproject'
      })
      .state('services', {
        url: '/services',
        templateUrl: 'app/services/index.tpl.html',
        controller: 'ServiceController',
        controllerAs: 'services'/*,
        need: 'admindoscat'*/
      })
      .state('service-edit', {
        url: '/services/detail/:id',
        templateUrl: 'app/services/detail.tpl.html',
        controller: 'ServiceEditController',
        controllerAs: 'detailsrv'
      })
      .state('provinstances', {
        url: '/provinstances',
        templateUrl: 'app/projects/provider/provinstances.tpl.html',
        controller: 'ProvInstancesController',
        controllerAs: 'provinstances',
        need: 'User.Provider'
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
        controller: 'RegisterController',
        controllerAs: 'register'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'app/users/users.tpl.html',
        controller: 'UserController',
        controllerAs: 'users'

      });

      $urlRouterProvider.otherwise('/catalog');
  }

  angular
    .module('marketplace')
    .run(scrollToTop)
    .run(setStatePermission);
    // .run(lookAtLocationChange)

    function setStatePermission ($rootScope, $state, CurrentUserFactory){
        var statePermission = $rootScope.$on('$stateChangeStart', function(event, destiny) {
            var userRole = CurrentUserFactory.getRole();
            if (destiny.need && userRole !== destiny.need) {
              event.preventDefault();
              $state.go('catalog');
            }
        });
        statePermission();
    }

    function scrollToTop ($rootScope, $document) {
      var stateWatcher = $rootScope.$on('$stateChangeSuccess', function () {
        $document.body.scrollTop = 0;
        $document.documentElement.scrollTop = 0;
      });
      stateWatcher();
    }

})();
