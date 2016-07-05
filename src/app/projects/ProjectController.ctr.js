(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log', 'UserFactory', 'ProjectsMock', 'ProgressFactory'];
	function ProjectController (toastr, ProjectFactory, $log, UserFactory, ProjectsMock, ProgressFactory){
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
			var progressbar = progressBarConfigure();
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
					vm.allProviderProjects = ProjectsMock;
					// vm.allProviderProjects = response.data.result;					
				}
			});
			progressbar.complete();
		};

	}

})();