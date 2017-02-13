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

      var publishServiceInCatalogue = function (srvId) {
        var path = ['api/services/',srvId].join(''),
            url = [host, path].join('');
        var deferred = $q.defer();

        var promise = $http.put(url, {activated: true}).then(function(response){
          console.log(response);
          return response.data;
        }, function (error) {
          deferred.reject(error);
        });

        return promise;
      };

      var hideServiceInCatalogue = function (srvId) {
        var path = ['api/services/',srvId].join(''),
            url = [host, path].join('');
        var deferred = $q.defer();

        var promise = $http.put(url, {activated: false}).then(function(response){
          console.log(response);
          return response.data;
        }, function (error) {
          deferred.reject(error);
        });

        return promise;
      };

      var createAnonymousProject = function (srv) {
        var path = 'api/projects',
            url = [host, path].join('');
        var deferred = $q.defer();
        var body = {
          "services": [{
            "service": srv._id
          }],
          "client": srv.provider
        };

        var promise = $http.post(url, body).then(function (response){
          return response.data;
        }, function (error){
          deferred.reject(error);
        });

        return promise;

      };

      return {
          getAllOwnProjects: function () {
            return getAllOwnProjects();
          },
          publishServiceInCatalogue: function (srvId) {
            return publishServiceInCatalogue(srvId);
          },
          hideServiceInCatalogue: function (srvId) {
            return hideServiceInCatalogue(srvId);
          },
          createAnonymousProject: function (srv) {
            return createAnonymousProject(srv);
          }
      };

    }
})();
