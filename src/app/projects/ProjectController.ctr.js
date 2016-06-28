(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log', 'UserFactory'];
	function ProjectController (toastr, ProjectFactory, $log, UserFactory){
		var vm = this;

		//getAll de projects (url falsa de users)
		vm.getAll = function(){
			ProjectFactory.getAll().then(function(response){
					if (response.success === false) {
						// toastr.info('response.error');
					} else {
						vm.allProjects = response.result;
					}
			});
		};

		vm.getUserByName = function (){
			var user_name = 'user.client1';
			UserFactory.getUserByName(user_name).then(function(response){
				if (response.success === false) {
					//
				} else {
					vm.currentUser = response.result[0];
				}
			});
		};

		vm.getProjectsByPartnerId = function(partnerId) {
			ProjectFactory.getProjectsByPartnerId(partnerId).then(function(response) {
				if (response.success === false) {
					//
				} else {
					vm.allClientProjects = response.result;
				}
			});
		};
	}

})();