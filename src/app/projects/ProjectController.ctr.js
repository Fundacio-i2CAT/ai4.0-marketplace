(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log', 'UserFactory', 'ProviderProjectsMockFactory', 'ClientProjectsMockFactory', 'ProgressFactory', '$location'];
	function ProjectController (toastr, ProjectFactory, $log, UserFactory, ProviderProjectsMockFactory, ClientProjectsMockFactory, ProgressFactory, $location){
		var vm = this;
		vm.model = {};

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

		vm.confirmProviderProject = function (srv) {
			console.log('crida al servei api/sprojects/<id> amb objecte {status: 3(confirmed)}');
			console.log(srv);
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


	}

})();