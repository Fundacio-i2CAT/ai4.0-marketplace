(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('NewProjectController', NewProjectController);

		NewProjectController.$inject = ['toastr','CurrentUserFactory', 'ROLES', '$log', 'ServiceFactory', 'ProjectFactory', '$location', '$state'];

		function NewProjectController(toastr, CurrentUserFactory, ROLES, $log, ServiceFactory, ProjectFactory, $location, $state) {
			var vm = this;
			vm.allServices = [];

			var user = CurrentUserFactory.getCurrentUser();

			var client_id;
			var services = [];

			vm.getCurrentClientId = function() {
				if (user.role === ROLES.client.role) {
					if (user.user.hasOwnProperty('client_id')) client_id = user.user.client_id;
					else client_id = user.user.provider_id
				}
			};

			vm.getCurrentClientId();

			//Crear Projecte
			vm.createClientProject = function(model){
				angular.forEach(model.services, function(serv) {
					var service = {"service": serv};
					services.push(service);
				});
				model.services = services;
				model.client = client_id;
				ProjectFactory.createClientProject(model).then(function(response){
					if (response.status == 201) {
						alert(response.status);
						// toastr.info('Projecte creat correctament', 'Creació de Projecte');
						$location.path("/clientprojects");
					}
					if (response.status != 201) {
						alert(response.status);
						// toastr.error('Problema al crear projecte', 'Error en Creació de Projecte');
						$location.path("/catalog");
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

			vm.selected = false;
			vm.clickService = function (srv) {
				$log.log(srv)
			}

			vm.cancelCreateProject = function() {
				$location.path('/catalog');
			}

			//Crida desde project-new.tpl.html per obtenir tots els serveis
			vm.getAllServices()

		}

})();
