(function(){
  'use strict';

  angular
    .module('marketplace')
    .factory('InfrastructureFactory', InfrastructureFactory);

    InfrastructureFactory.$inject = ['$http', '$q', 'ConnectionFactory'];

    function InfrastructureFactory($http, $q, ConnectionFactory) {
      var host = ConnectionFactory.host;

      var getInfrastructureProvider = function() {
        var path = 'api/services/pop',
            url = [host, path].join('');
        var deferred = $q.defer();

        var promise = $http.get(url).then(function(response){
            return response.data;
        }, function (error){
          deferred.reject(error);
        });

        return promise;
      };

      return {
        getInfrastructureProvider: function() {
          return getInfrastructureProvider();
        }
      };


    }
})();
