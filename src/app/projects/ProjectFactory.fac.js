(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ProjectFactory', ProjectFactory);

	ProjectFactory.$inject = ['$http', 'ConnectionFactory'];
	function ProjectFactory($http, ConnectionFactory){
		var host = ConnectionFactory.host;

		var factory = {};
		factory.getAll = getAll;
		factory.getClientProjectsByPartnerId = getClientProjectsByPartnerId;
		factory.getProviderProjectsByPartnerId = getProviderProjectsByPartnerId;

		/*
			clientProjectsRest
			api/clients/<id>/projects

			tempId: 5772623079374a27ad8a393f
		*/
		function getAll() {
			var allProjectsUrl = [host, 'api/projects'].join('');
			return $http.get(allProjectsUrl).then(handleSuccess, handleError);
		}

		/* 	Client
			get all projects by partnerId
		*/
		function getClientProjectsByPartnerId (partnerId) {
			var url = [host, 'api/clients/', partnerId, '/projects'].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}

		/*
			Provider
			get all projects by partnerId
		*/
		function getProviderProjectsByPartnerId (partnerId) {
			var url = [host, 'api/providers/', partnerId, '/projects'].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}

		/*
			ProviderProject
			confirmació projecte
		*/
		function confirmProviderProject(srv) {
			var url = [host, 'api/sprojects/', srv._id].join('');
			var status = {
				status: 3
			};
			return $http.put(url, status).then(handleSuccess, handleError);
		}

		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function handleSuccess(response){
			return response;	
		}

		function handleError(error){
			/*return function(){
				return {success: false, message: error};
			};*/
			return error;
		}

		return factory;

	}

})();