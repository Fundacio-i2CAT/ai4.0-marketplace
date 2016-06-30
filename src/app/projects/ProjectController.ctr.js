(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log', 'UserFactory', 'ProjectsMock', 'ngProgressFactory'];
	function ProjectController (toastr, ProjectFactory, $log, UserFactory, ProjectsMock, ngProgressFactory){
		var vm = this;
		vm.model = {};

		//getAll de projects (url falsa de users)
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
			progressbar.start();
			ProjectFactory.getClientProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.info('Hi ha hagut un errror al obtenir els projectes...', 'Nasti de plasti');
				} else {
					vm.allClientProjects = response.data.result;
					toastr.info('Projectes relacionats amb el seu compte de client', 'Everything flows');
				}
			});
			vm.progressbar.complete();
		};

		vm.getProviderProjectsByPartnerId = function (partnerId){
			ProjectFactory.getProviderProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.info('Hi ha hagut un errror al obtenir els projectes...', 'Nasti de plasti');
				} else {
					toastr.info('Projectes relacionats amb el seu compte de proveïdor', 'Everything flows');
					vm.allProviderProjects = ProjectsMock;
					// vm.allProviderProjects = response.data.result;					
				}
			});
		};

		function progressBarConfigure (){
			var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('4px');
			progressbar.setColor('#00802b');

			vm.progressbar = progressbar;
			return progressbar;
		}
	}

})();