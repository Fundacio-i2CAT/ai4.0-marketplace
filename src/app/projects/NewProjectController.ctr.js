(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('NewProjectController', NewProjectController);

		NewProjectController.$inject = ['toastr','CurrentUserFactory', 'ROLES', '$log', 'ServiceFactory', 'ProjectFactory'];

		function NewProjectController(toastr, CurrentUserFactory, ROLES, $log, ServiceFactory, ProjectFactory) {
			var vm = this;

			var user = CurrentUserFactory.getCurrentUser();
			var client_id;
			var services = [];
			
			vm.getCurrentClientId = function() {
				var user = CurrentUserFactory.getCurrentUser();
				if (user.role === ROLES.client.role) {
					var currentUser = user.user.client_id;
				}
			};

			vm.getCurrentClientId();

			//Crear Projecte
			vm.createClientProject = function(model){
				angular.forEach(model.services, function(serv){
					var service = {"service": serv};
					services.push(service);
				});			
				model.services = services;
				model.client = client_id;
				ProjectFactory.createClientProject(model).then(function(response){
					if(response.status == 201){
						$location.path("/clientprojects");
					}else{
						toastr.error('Problema al crear projectes', response.data.msg);
					}
				});
			};

			vm.getAllServices = function(){
				ServiceFactory.getAllServices().then(function(response){
					if (response.status === 200) {
						vm.allServices = response.data.result;
					}
				});
			}

			//Crida desde project-new.tpl.html per obtenir tots els serveis
			vm.getAllServices()

		}

})();