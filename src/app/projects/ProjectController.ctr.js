(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log', 'UserFactory'];
	function ProjectController (toastr, ProjectFactory, $log, UserFactory){
		var vm = this;
		vm.model = {};

		//getAll de projects (url falsa de users)
		vm.getAll = function(){
			ProjectFactory.getAll().then(function(response){
					if (response.data.success === false) {
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
				if (response.data.success === false) {
					//
				} else {
					vm.currentUser = response.data.result[0];
				}
			});
		};

		vm.getClientProjectsByPartnerId = function(partnerId) {
			ProjectFactory.getClientProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.success === false) {
					//
				} else {
					vm.allClientProjects = response.data.result;
					$log.log(response.result);
				}
			});
		};
	}

})();