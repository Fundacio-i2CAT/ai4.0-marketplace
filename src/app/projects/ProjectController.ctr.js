(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['$rootScope', '$timeout', '$interval', 'toastr', 'ProjectFactory', '$log', '$state', 'UserFactory', 'ProviderProjectsMockFactory', 'ClientProjectsMockFactory', 'ProgressFactory', '$location', 'ServiceFactory', '$stateParams', 'CurrentUserFactory', 'ROLES', 'usSpinnerService'];
	function ProjectController ($rootScope, $timeout, $interval, toastr, ProjectFactory, $log, $state, UserFactory, ProviderProjectsMockFactory, ClientProjectsMockFactory, ProgressFactory, $location, ServiceFactory, $stateParams, CurrentUserFactory, ROLES, usSpinnerService){
		var vm = this;
		vm.sortType = 'srv.project.name';
		vm.sortReverse = true;
		vm.sortTypeClient = '';
		vm.sortReverseClient = false;
		vm.showIp = false;

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
			ProjectFactory.getClientProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.error('Hi ha hagut un errror al obtenir els projectes...', 'Hi ha un problema');
				} else {
					vm.allClientProjects = response.data.result;
				}
			});
			progressbar.complete();
		};

		/*
			Devuelve una imagen u otra según el tipo de servicio (actualmente se mira por el nombre)

			TODO
			Mover esta funcion a una factoría común en lugar de un controlador
		*/
		vm.getImage = function (name) {
			var image = null;
			var lowerName = name.toLowerCase();
			switch(lowerName) {
				case 'apache':
					image = 'apache.png';
					break;
				case 'cloud':
					image = 'cloud-services2.jpg';
					break;
				case 'openstack':
					image = 'cloud-services2.jpg';
					break;
				case 'service1':
					image = 'services01.jpg';
					break;
				default:
					image = 'services01.jpg';
					break;
			}
			return image;
		}

		vm.getProviderProjectsByPartnerId = function (partnerId){
			var progressbar = ProgressFactory.progressBarConfigure();
			progressbar.start();
			
			ProjectFactory.getProviderProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status === 'fail') {
					toastr.error('Hi ha hagut un error al obtenir els projectes...', 'Hi ha un problema');
				} else {
					vm.allProviderProjects = response.data.result;
					var hasPendings = false;
					var i = 0;
					vm.allProviderProjects.forEach(function(each){
						if (each.status === 1){
							hasPendings = true;
							i = i +1;
						} 

					});
					if (hasPendings) toastr.info("Té " + i + " projectes(s) per confirmar");
					
				}
			});
			progressbar.complete();
		};

		/*vm.getAllServices = function(){
			ServiceFactory.getAllServices().then(function(response){
				if (response.status === 200) {
				}
			});
		}*/

		vm.confirmProviderProject = function (srv) {
			/////////////////////////////////////////////////////////////////////
			ProjectFactory.confirmProviderProject(srv).then(function(response){
				if (response.status === 200) {
					$state.reload();
				} else {
					toastr.error("No s'ha pogut confirmar el Servei...", 'Hi ha un error');
				}
			});
		};

		vm.disableProviderProject = function (srv) {
			/////////////////////////////////////////////////////////////////////
			ProjectFactory.disableProviderProject(srv).then(function(response){
				if (response.status === 200) {
					$state.reload();
				}
			});
		};

		//ir a vista detalle del servicio host/services/detail/:id
		vm.goServiceDetail = function(servId) {
			var url = ['services/detail/', servId].join('');
			$location.path(url);
		};

		//ir a vista edicion del servicio host/services/edit/:id
		vm.goEditProject = function(projectId) {
			var url = ['clientproject/edit/', projectId].join('');
			$location.path(url);
		};

		vm.editClientProject = function(model){
			var new_model = {}
			services = [];
			if (model.services  != null){
				angular.forEach(model.services, function(serv){
					var service = {"service": serv};
					services.push(service);
				});
				new_model.services = services;
			}						
			new_model.name = model.name;
			ProjectFactory.editClientProject(new_model, model._id).then(function(response){
				if(response.status == 200){
					$location.path("/clientprojects");
				}else{
					toastr.error('Problema al editar projectes', response.data.msg);
				}
			});
		};

		//getProjectById
		vm.getProjectById = function (id){
			ProjectFactory.getProjectById(id).then(function (response){
				if (response.status === 200) {
					vm.projectToEdit = response.data;
					var aServices = [];
					angular.forEach(response.data.services, function(serv){
						aServices.push(serv.service._id);
					});
					vm.array_services = aServices;
				}
			});
		};

		//runProject (by Client user)
		vm.runProject = function (id) {
			// var progressbar = ProgressFactory.progressBarConfigure();
			// progressbar.start();
			

			ProjectFactory.runProject(id).then(function (response){
				if (response.status === 200) {
					/*$timeout( function(){
						ProjectFactory.getProjectState(id).then(function(response){
							$log.log('getProjectState response', response);
							vm.allClientProjects.forEach(function(each) {
								if (each._id === id) {
									each.status = 5;
								}
							});
						});
					}, 3000);*/
					var internalPromise = $interval(function(){
						ProjectFactory.getProjectState(id).then(function(response){
							$log.log('getProjectState Run response', response);
							if (response.data.status === 5) {
								$interval.cancel(internalPromise);
								console.log('cancelado');
								vm.stopSpin();
								$state.reload();
							}
						});
					}, 1000);
					
					
				}
			});
			
			// progressbar.complete();
		}

		vm.getStatus = function (id){
			ProjectFactory.getProjectState(id).then(function(response){
				if (response) {
					vm.kk = response;
				}
			});
		};

		//stopProject (by Client user)
		vm.stopProject = function (id) {
			ProjectFactory.stopProject(id).then(function (response){
				if (response.status === 200) {
					/*$timeout( function(){
						ProjectFactory.getProjectState(id).then(function(response){
							$log.log('getProjectState response', response);
							vm.allClientProjects.forEach(function(each) {
								if (each._id === id) {
									each.status = 6;
								}
							});
						});
					}, 3000);*/

					var internalPromiseStop = $interval(function(){
						ProjectFactory.getProjectState(id).then(function(response){
							$log.log('getProjectState Stop response', response);
							if (response.data.status === 6) {
								$interval.cancel(internalPromiseStop);
								console.log('cancelado');
								vm.stopSpin();
								$state.reload();
							}
						});
					}, 1000);

				}
			});
		}

		vm.deleteProject = function(id){
			ProjectFactory.deleteProject(id).then(function(response){
				if(response.status===200){
					// $location.path("/clientprojects");
					$state.reload();
				}else{
					toastr.error("No s'ha pogut borrar el projecte");
				}
			});
		}

		vm.hasChanged = function(){
			var css_selected =  document.getElementsByClassName("selected");
			for (var i = 0; i<=css_selected.length; i++){
				if (css_selected[0] != null){
					css_selected[0].className = "";
				}
				
			}
		}

		/*
		ESTA FUNCIÓN HA DE IR FUERA.
		Se ha de crear un servicio, en el catálogo, que devuelva el nombre en catalán.		
		*/
		vm.getLiteralStatus = function(status){
			var output;
			switch(status) {
				case 1: output = 'Pendent';
					break;
				case 3: output = 'Confirmat';
					break;
				case 5: output = 'Actiu';
					break;
				case 6: output = 'Parat';
					break;
			}
			return output;
		}

		vm.getProjectState = function(id){
			ProjectFactory.getProjectState(id).then(function(response){
				$log.log(response);
			});
		}



		if ($stateParams.id) {
			vm.getProjectById($stateParams.id);
		}

		//crida desde projects/providers/index-prov.tpl.html
		var user = CurrentUserFactory.getCurrentUser();
		
		if (user.role === ROLES.provider.role && $state.current.name === ROLES.provider.state) {
			vm.getProviderProjectsByPartnerId(user.user.provider_id);
		}

		if (user.role === ROLES.client.role && $state.current.name === ROLES.client.state) {
			vm.getClientProjectsByPartnerId(user.user.provider_id);
		}

		vm.startSpin = function() {
	      usSpinnerService.spin('spinner-1');
	    };

	    vm.stopSpin = function() {
	      usSpinnerService.stop('spinner-1');
	    };

	}

})();