(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ProjectFactory', ProjectFactory);

	ProjectFactory.$inject = ['$http', 'ConnectionFactory', 'ngDialog', 'LocalStorageFactory'];
	function ProjectFactory($http, ConnectionFactory, ngDialog, LocalStorageFactory){
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
		factory.deleteProject = deleteProject;
		factory.getProjectState = getProjectState;
		factory.stopProject = stopProject;
		factory.confirmDeleteProject = confirmDeleteProject;
		factory.getPendingProviderProjectsByPartnerId = getPendingProviderProjectsByPartnerId;
		factory.denyProviderProject = denyProviderProject;
		factory.reacceptProviderProject = reacceptProviderProject;

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
			var newAmazingUrl = [host, 'api/sprojects/provider/', partnerId, '/status?status=3,5,6,8'].join('');
			return $http.get(newAmazingUrl).then(handleSuccess, handleError);
		}

		/*
			Provider
			get all pending projects by partnerId
		*/
		function getPendingProviderProjectsByPartnerId () {
			var user = LocalStorageFactory.getValue('user');
			var url = [host, 'api/sprojects/provider/', user.user.provider_id, '/status?status=1'].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}

		/*
			ProviderProject
			confirmació projecte status: 3
		*/
		function confirmProviderProject(srv) {
			var url = [host, 'api/sprojects/', srv._id].join('');
			var newURL = [host, '/api/project/',srv._id, '/state'].join('');
			var status = {
				status: 3
			};
			return $http.put(url, status).then(handleSuccess, handleError);
		}

		/*
			ProviderProject
			denegació de projecte status: 10
		*/
		function denyProviderProject(srv) {
			var url = [host, 'api/project/',srv._id, '/state'].join('');
			var status = {
				status: 10
			};
			return $http.put(url, status).then(handleSuccess, handleError);
		}

		/*
			ProviderProject
			reacceptació de projecte status: 5
		*/
		function reacceptProviderProject(srv) {
			var url = [host, 'api/project/',srv._id, '/state'].join('');
			var status = {
				status: 5
			};
			return $http.put(url, status).then(handleSuccess, handleError);
		}

		/*
			ProviderProject
			deshabilitació projecte ()
		*/
		function disableProviderProject(srv) {
			// var url = [host, 'api/sprojects/', srv._id].join('');
			var newUrl = [host, 'api/project/', srv._id, '/state'].join('');
			var status = {
				status: 8
			};
			return $http.put(newUrl, status).then(handleSuccess, handleError);
		}

		//create new client project
		function createClientProject(model){
			var url = [host,'api/projects'].join('');
			var objectToSave = {};
			objectToSave = model;
			return $http.post(url, objectToSave).then(handleSuccess, handleError);
		}

		//edit client project
		function editClientProject(model, id){
			var url = [host,'api/projects/', id].join('');
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
			var url = [host, 'api/project/', id, '/state'].join('');
			return $http.put(url, {status: 5}).then(handleSuccess, handleError);
		}

		//stopProject(by Client id)
		function stopProject(id) {
			var url = [host, 'api/project/', id, '/state'].join('');
			return $http.put(url, {status: 6}).then(handleSuccess, handleError);
		}

		//delete Project by id
		function deleteProject(id) {
			var url = [host, 'api/projects/', id].join('');
			return $http.delete(url).then(handleSuccess, handleError);
		}

		//obtenir l'estat actual d'un projecte
		function getProjectState(id) {
			var url = [host, 'api/projects/', id, '/state'].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}

		//launch confirm diaglog on press delete button
		function confirmDeleteProject(project, vm) {
			vm.projectToRemove = project;
			ngDialog.open({
				template: 'app/projects/client/delete-project/delete_project.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'delete-project',
				controller: 'OwnProjectController',
				data: vm
			});
		};


		/**
		*	manage error run/stop projectes
		* @param
		*/
		function errorManagementRunningStopping() {
			//si el projecte ja està running
			// if (response.data.status === 6) {
			// 	srv.showSpinner = false;
			// 	$interval.cancel(internalPromise);
			// 	var backmessage;
			// 	if ($translate.use() == 'CAT') {
			// 		backmessage = response.data.message.ca;
			// 	} else if ($translate.use() == 'CAST') {
			// 		backmessage = response.data.message.es;
			// 	}
			//
			// 	toastr.success(backmessage, response.data.code);
			// 	vm.getClientProjectsByPartnerId(user.user.provider_id);
			// }
		}


		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function handleSuccess(response){
			return response;
		}

		function handleError(error){
			return error;
		}

		return factory;

	}

})();
