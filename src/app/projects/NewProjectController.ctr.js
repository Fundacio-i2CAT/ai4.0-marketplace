(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('NewProjectController', NewProjectController);

		NewProjectController.$inject = ['toastr','LocalStorageFactory', 'ROLES', '$log', 'ServiceFactory', 'ProjectFactory', '$location', '$translate'];

		function NewProjectController(toastr, LocalStorageFactory, ROLES, $log, ServiceFactory, ProjectFactory, $location, $translate) {
			var vm = this;
			vm.allServices = [];

			var user = LocalStorageFactory.getValue('user');

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
						toastr.info('Projecte creat correctament', 'Creació de Projecte');
						$location.path("/clientprojects");
					}
					if (response.status == 409) {
							var backmessage;
							if ($translate.use() == 'CAT') {
								backmessage = response.data.message.ca;
							} else if ($translate.use() == 'CAST') {
								backmessage = response.data.message.es;
							}
							toastr.error(backmessage, response.data.code);
							$location.path('/catalog');
					} else if (response.status != 201) {
							toastr.error('No s\'ha pogut crear el projecte', 'Error en la Creació de Projecte');
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
				$location.path('/clientprojects');
			}

			//Crida desde project-new.tpl.html per obtenir tots els serveis
			vm.getAllServices()

		}

})();
