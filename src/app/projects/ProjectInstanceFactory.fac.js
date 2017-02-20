(function(){
  'use strict';

  angular
    .module('marketplace')
    .factory('ProjectInstanceFactory', ProjectInstanceFactory);

    ProjectInstanceFactory.$inject = ['$http', 'ConnectionFactory', '$q', 'ngDialog'];

    function ProjectInstanceFactory($http, ConnectionFactory, $q, ngDialog) {
      //run/stop projects

    }
})();
