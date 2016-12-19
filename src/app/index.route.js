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
      // .state('projects', {
      //   url: '/projects',
      //   templateUrl: 'app/projects/index.tpl.html', controller: 'ProjectController', controllerAs: 'projects'/*,
      //   need: 'admindoscat'*/
      // })
      .state('provprojects', {
        url: '/provprojects',
        templateUrl: 'app/projects/provider/index-prov.tpl.html',
        controller: 'ProjectController',
        controllerAs: 'provprojects',
        need: 'Partner.Provider'
      })
      .state('publishsrv', {
        url: '/publishsrv',
        templateUrl: 'app/projects/publish_service/publishsrv.tpl.html',
        controller: 'PublishSrvController',
        controllerAs: 'publishsrv',
        need: 'Partner.Provider'
      })
      .state('clientprojects', {
        url: '/clientprojects',
        templateUrl: 'app/projects/client/index-client.tpl.html',
        controller: 'ProjectController',
        controllerAs: 'clientprojects'/*,
        need: 'Partner.Client'*/
      })
      .state('project-new', {
        url: '/clientproject/new',
        templateUrl: 'app/projects/client/project-new.tpl.html',
        controller: 'NewProjectController',
        controllerAs: 'newproject'
      })
      .state('project-edit', {
        url: '/clientproject/edit/:id',
        templateUrl: 'app/projects/client/project-edit.tpl.html',
        controller: 'ProjectController',
        controllerAs: 'editproject'
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
        need: 'Partner.Provider'
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
        controllerAs: 'users'/*,
        need: 'admindoscat'*/
      })
      .state('tatami', {
        url: '/tatami',
        templateUrl: 'app/tatami/tatami.tpl.html',
        controller: 'TatamiController',
        controllerAs: 'tatami'/*,
        need: 'admindoscat'*/
      })
      .state('forgotpass', {
        url: '/forgot',
        templateUrl: 'app/login/forgotpass.tpl.html',
        controller: 'ForgotPassController',
        controllerAs: 'forgot'/*,
        need: 'admindoscat'*/
      });

      $urlRouterProvider.otherwise('/catalog');
  }

  angular
    .module('marketplace')
    .run(scrollToTop)
    .run(setStatePermission);
    // .run(lookAtLocationChange)

    function setStatePermission ($rootScope, $state, CurrentUserFactory){
        $rootScope.$on('$stateChangeStart', function(event, destiny) {
            var userRole = CurrentUserFactory.getRole();
            if (destiny.need && userRole !== destiny.need) {
              event.preventDefault();
              $state.go('catalog');
            }
        });
    }

    function scrollToTop ($rootScope) {
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      });
    }

    /*function lookAtLocationChange($rootScope) {
      //$routeChangeStart
      //$locationChangeStart, $locationChangeSuccess
      $rootScope.$on('$locationChangeStart', function (event, next) {
          console.log('event', event);
          console.log('next', next);
      });
    }*/

})();
