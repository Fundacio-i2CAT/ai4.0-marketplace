(function() {
  'use strict';

  angular
    .module('marketplace')
    .factory('OwnProjectFactory', OwnProjectFactory);

    OwnProjectFactory.$inject = ['$http', '$q', 'ConnectionFactory', 'LocalStorageFactory'];

    function OwnProjectFactory($http, $q, ConnectionFactory, LocalStorageFactory) {
      var host = ConnectionFactory.host;

      var getAllOwnProjects = function (user) {
        var user = angular.fromJson(LocalStorageFactory.getValue('user'));
        var path = ['api/services/provider/', user.user.id].join(''),
            url = [host, path].join('');

        var deferred = $q.defer();

        var promise =  $http.get(url).then(function(response){
          return response.data;
        }, function (error){
          deferred.reject(error);
        });

        return promise;

      };

      return {
          getAllOwnProjects: function () {
            return getAllOwnProjects();
          }
      };

    }
})();
