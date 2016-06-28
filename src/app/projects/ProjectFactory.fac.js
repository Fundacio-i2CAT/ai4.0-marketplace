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
		factory.getProjectsByPartnerId = getProjectsByPartnerId;

		/*
			clientProjectsRest
			api/clients/<id>/projects

			tempId: 5772623079374a27ad8a393f
		*/
		function getAll() {
			var allProjectsUrl = [host, 'api/projects'].join('');
			return $http.get(allProjectsUrl).then(handleSuccess, handleError('Error getting al projects'));
		}

		/* 	Client
			get all projects by partnerId
		*/
		function getProjectsByPartnerId (partnerId) {
			var url = [host, 'api/clients/', partnerId, '/projects'].join('');
			return $http.get(url).then(handleSuccess, handleError('Error getting Projectes from client.'));
		}



		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function handleSuccess(response){
			return response.data;	
		}

		function handleError(error){
			return function(){
				return {success: false, message: error};
			};
		}

		return factory;

	}

})();