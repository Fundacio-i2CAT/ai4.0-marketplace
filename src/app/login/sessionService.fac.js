(function() {
  'use strict';

  angular
    .module('marketplace')
    .factory('SessionFactory', SessionFactory);

    SessionFactory.$inject = ['$http', '$translate', '$state', 'toastr', 'CurrentUserFactory', 'LocalStorageFactory'];
    function SessionFactory($http, $translate, $state, toastr, CurrentUserFactory, LocalStorageFactory) {

      var sessionIsExpird = function(error) {
        if (error.status == 403 && error.data.code == "TOKEN_EXPIRED") {
          var message;
          if ($translate.use() == 'CAT') {
            message = error.data.message.ca;
          } else {
            message = error.data.message.es;
          }
          toastr.error(message, 'Sessió caducada')
          $http.defaults.headers.common['Authorization'] = '';
          CurrentUserFactory.removeCurrentUser();
          LocalStorageFactory.removeItem('user');
          $state.go('login');
        }
        return;
      };


      return {
        sessionIsExpird: function (error) {
          return sessionIsExpird(error);
        }
      };

    }
})();
