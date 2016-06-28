(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ProjectFactory', ProjectFactory);

	ProjectFactory.$inject = ['$http','ngProgressFactory', 'toastr', 'ConnectionFactory'];
	function ProjectFactory($http, ngProgressFactory, toastr, ConnectionFactory){
		var host = ConnectionFactory.host;

		var factory = {};
		factory.getAll = getAll;

		/*
			clientProjectsRest
			
			api/clients/<id>/projects
		*/
		function getAll(userId) {
			var url = [host, 'api/clients/', userId, '/projects'].join('');
			return $http.get(url).then(handleSuccess, handleError('Error getting al projects'));
		}

		//private functions
		function handleSuccess(response){
			return response.data;	
		}

		function handleError(error){
			return function(){
				return {message: error};
			}
		}

		return factory;

	}

})();