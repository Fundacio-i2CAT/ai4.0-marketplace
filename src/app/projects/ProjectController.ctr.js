(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log', 'UserFactory', 'ProviderProjectsMockFactory', 'ClientProjectsMockFactory', 'ProgressFactory', '$location', 'ServiceFactory'];
	function ProjectController (toastr, ProjectFactory, $log, UserFactory, ProviderProjectsMockFactory, ClientProjectsMockFactory, ProgressFactory, $location, ServiceFactory){
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
			/*ProjectFactory.getClientProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.error('Hi ha hagut un errror al obtenir els projectes...', 'Hi ha un problema');
				} else {
					vm.allClientProjects = ClientProjectsMockFactory;
					// vm.allClientProjects = response.data.result;
					toastr.success('Projectes relacionats amb el seu compte de client', 'Everything flows');
				}
			});*/
			vm.allClientProjects = ClientProjectsMockFactory;
			progressbar.complete();
		};

		vm.getProviderProjectsByPartnerId = function (partnerId){
			var progressbar = ProgressFactory.progressBarConfigure();
			progressbar.start();
			vm.allProviderProjects = ProviderProjectsMockFactory;
			/*ProjectFactory.getProviderProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.error('Hi ha hagut un errror al obtenir els projectes...', 'Hi ha un problema');
					vm.allProviderProjects = ProviderProjectsMockFactory;
				} else {
					toastr.success('Projectes relacionats amb el seu compte de proveïdor', 'Everything flows');
					vm.allProviderProjects = ProviderProjectsMockFactory;
					// vm.allProviderProjects = response.data.result;					
				}
			});*/
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
			/*ProjectFactory.confirmProviderProject(srv).then(function(response){
				if (response) {
					// alert('response');
					toastr.success('Servei confirmat correctament.', 'Confirmació Servei');
				}
			});*/
		};

		//ir a vista detalle del servicio host/services/edit/:id
		vm.goServiceDetail = function(id) {
			var url = ['services/edit/', id].join('');
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
		}


		//Crida desde project-new.tpi.html per obtenir tots els serveis
		vm.getAllServices();
	}

})();