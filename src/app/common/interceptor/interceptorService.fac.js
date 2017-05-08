(function (){
  'use strict';

  angular
    .module('marketplace')
    .factory('InterceptorService', InterceptorService);

    InterceptorService.$inject = ['$q', 'LocalStorageFactory', '$log', '$injector'];

    function InterceptorService($q, LocalStorageFactory, $log, $injector){
      return {
        request: function (config) {
          var user = LocalStorageFactory.getValue('user');
          if (user) {
            config.headers['Authorization'] = user.user.token;
          } else {
            config.headers['Authorization'] = '';
          }

          // $log.log('authorization::::::', config.headers['Authorization']);
          return config || $q.when(config);
        },
        requestError: function (rejection) {
          // $log.log('requestError');
          return $q.reject(rejection);
        },
        response: function (response) {
          // $log.log('response');
          return response || $q.when(response);
        },
        responseError: function (rejection) {
          // $log.log('responseError::', rejection);
          if (rejection && rejection.status == 403) {
            var sessionService = $injector.get('SessionFactory');
            sessionService.sessionIsExpird(rejection);
          }
          return $q.reject(rejection);
        }
      };
    }
  }
  )();
