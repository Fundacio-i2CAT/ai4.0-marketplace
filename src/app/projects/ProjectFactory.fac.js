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
		factory.confirmProviderProject = confirmProviderProject;
		factory.createClientProject = createClientProject;
		factory.editClientProject = editClientProject;
		factory.getProjectById = getProjectById;
		factory.runProject = runProject;
		factory.disableProviderProject = disableProviderProject;


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
			confirmació projecte (edicio de prop 'status')
		*/
		function confirmProviderProject(srv) {
			var url = [host, 'api/sprojects/', srv._id].join('');
			var status = {
				status: 2
			};
			return $http.put(url, status).then(handleSuccess, handleError);
		}

		/*
			ProviderProject
			deshabilitació projecte ()
		*/
		function disableProviderProject(srv) {
			var url = [host, '', srv_id].join('');
		}

		//create new client project
		function createClientProject(model){
			var url = [host,'api/projects'].join('');
			var objectToSave = {};
			objectToSave = model;
			return $http.post(url, objectToSave).then(handleSuccess, handleError);
		}

		//edit client project
		function editClientProject(model){
			var url = [host,'api/projects'].join('');
			var objectToSave = {};
			objectToSave = model;
			return $http.put(url, objectToSave).then(handleSuccess, handleError);
		}

		//get Project by id
		function getProjectById(id) {
			var url = [host, 'api/projects/', id].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}

		//runProject(by Client id)
		function runProject(id) {
			var url = [host, 'api/projects/', id, '/state'].join('');
			return $http.put(url, {"status": 5}).then(handleSuccess, handleError);
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