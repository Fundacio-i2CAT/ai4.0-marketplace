(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr', 'ProjectFactory', '$log'];
	function ProjectController (toastr, ProjectFactory, $log){
		var vm = this;

		//getAll de projects (url falsa de users)
		vm.getAll = function(){
			ProjectFactory.getAll().then(function(response){
					vm.allUsers = response.result;
			}, function (error){
					$log.log(error);
			});
		}
	}

})();