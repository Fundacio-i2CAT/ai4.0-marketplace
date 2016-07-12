(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log', '$state', 'UserFactory', 'ProviderProjectsMockFactory', 'ClientProjectsMockFactory', 'ProgressFactory', '$location', 'ServiceFactory', '$stateParams', 'CurrentUserFactory', 'ROLES'];
	function ProjectController (toastr, ProjectFactory, $log, $state, UserFactory, ProviderProjectsMockFactory, ClientProjectsMockFactory, ProgressFactory, $location, ServiceFactory, $stateParams, CurrentUserFactory, ROLES){
		var vm = this;
		vm.model = {};
		var services = [];

		//getAll projects
		vm.getAll = function(){
			ProjectFactory.getAll().then(function(response){
					if (response.data.status === 'fail') {
						// toastr.info('response.error');
					} else {
						vm.allProjects = response.data.result;
					}
			});
		};

		vm.getUserByName = function (){
			var user_name = vm.model.username;
			$log.log(user_name);
			UserFactory.getUserByName(user_name).then(function(response){
				if (response.data.status === 'fail') {
					//
				} else {
					vm.currentUser = response.data.result[0];
				}
			});
		};

		vm.getClientProjectsByPartnerId = function(partnerId) {
			var progressbar = ProgressFactory.progressBarConfigure();
			progressbar.start();
			ProjectFactory.getClientProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.error('Hi ha hagut un errror al obtenir els projectes...', 'Hi ha un problema');
				} else {
					vm.allClientProjects = response.data.result;
					toastr.success('Projectes relacionats amb el seu compte de client', 'Everything flows');
				}
			});
			progressbar.complete();
		};

		vm.getProviderProjectsByPartnerId = function (partnerId){
			var progressbar = ProgressFactory.progressBarConfigure();
			progressbar.start();
			
			ProjectFactory.getProviderProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.error('Hi ha hagut un errror al obtenir els projectes...', 'Hi ha un problema');
				} else {
					toastr.success('Projectes relacionats amb el seu compte de proveïdor', 'Everything flows');
					vm.allProviderProjects = response.data.result;					
				}
			});
			progressbar.complete();
		};

		vm.getAllServices = function(){
			ServiceFactory.getAllServices().then(function(response){
				if (response.status === 200) {
					vm.allServices = response.data.result;
				}
			});
		}

		vm.confirmProviderProject = function (srv) {
			/////////////////////////////////////////////////////////////////////
			ProjectFactory.confirmProviderProject(srv).then(function(response){
				if (response) {
					// toastr.success('Servei confirmat correctament.', 'Confirmació Servei');
				}
			});
		};

		//ir a vista detalle del servicio host/services/detail/:id
		vm.goServiceDetail = function(servId) {
			var url = ['services/detail/', servId].join('');
			$location.path(url);
		};

		//ir a vista edicion del servicio host/services/edit/:id
		vm.goEditProject = function(projectId) {
			var url = ['clientproject/edit/', projectId].join('');
			$location.path(url);
		};

		//Crear Projecte
		vm.createClientProject = function(model){
			angular.forEach(model.services, function(serv){
				var service = {"service": serv};
				services.push(service);
			});			
			model.services = services;
			ProjectFactory.createClientProject(model).then(function(response){
				if(response.status == 201){
					$location.path("/clientprojects");
				}else{
					toastr.error('Problema al crear projectes', response.data.msg);
				}
			});
		};

		vm.editClientProject = function(model){
			if (model.services  != null){
				angular.forEach(model.services, function(serv){
					var service = {"service": serv._id};
					services.push(service);
				});
				model.services = services;
			}						
			
			ProjectFactory.editClientProject(model).then(function(response){
				if(response.status == 201){
					$location.path("/clientprojects");
				}else{
					toastr.error('Problema al editar projectes', response.data.msg);
				}
			});
		};

		//getProjectById
		vm.getProjectById = function (id){
			ProjectFactory.getProjectById(id).then(function (response){
				if (response.status === 200) {
					vm.projectToEdit = response.data;
					var aServices = [];
					angular.forEach(response.data.services, function(serv){
						aServices.push(serv._id);
					});
					vm.array_services = aServices;
				}
			});
		};

		//runProject (by Client user)
		vm.runProject = function (id) {
			ProjectFactory.runProject(id).then(function (response){
				if (response.data.status === 'ok') {
					$log.log(response);
				}
			});
		}

		//stopProject (by Client user)
		vm.stopProject = function (id) {
			ProjectFactory.stopProject(id).then(function (response){
				if (response) {
					$log.log(response);
				}
			});
		}



		if ($stateParams.id) {
			vm.getProjectById($stateParams.id);
		}

		//Crida desde project-new.tpl.html per obtenir tots els serveis
		vm.getAllServices()

		//crida desde projects/providers/index-prov.tpl.html
		var user = CurrentUserFactory.getCurrentUser();
		
		if (user.role === ROLES.provider.role && $state.current.name === ROLES.provider.state) {
			vm.getProviderProjectsByPartnerId(user.user.provider_id);
		}

		if (user.role === ROLES.client.role && $state.current.name === ROLES.client.state) {
			vm.getClientProjectsByPartnerId(user.user.provider_id);
		}

		vm.hasChanged = function(){
			var css_selected =  document.getElementsByClassName("selected");
			angular.forEach(css_selected, function(css_new){
				css_new.className = "";
			});
		}
	}

})();