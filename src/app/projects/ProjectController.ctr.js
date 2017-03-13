(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['$scope', '$sce', '$interval', '$state', 'toastr', 'ProjectFactory', '$log', 'UserFactory', 'ProgressFactory', '$location', 'ServiceFactory', '$stateParams', 'CurrentUserFactory', 'ROLES', 'usSpinnerService', 'ImageProviderFactory', 'LiteralFactory', 'ngDialog', 'ShareDataFactory', '$timeout', 'LocalStorageFactory', '$translate'];
	function ProjectController ($scope, $sce, $interval, $state, toastr, ProjectFactory, $log, UserFactory, ProgressFactory, $location, ServiceFactory, $stateParams, CurrentUserFactory, ROLES, usSpinnerService, ImageProviderFactory, LiteralFactory, ngDialog, ShareDataFactory, $timeout, LocalStorageFactory, $translate){
		var vm = this;
				vm.kk;
		vm.showRuntime = false;

		//table pagination
		vm.viewby = 10;
		vm.currentPage = 1;
		vm.itemsPerPage = vm.viewby;
		vm.maxSize = 10;
		vm.numPages;
		vm.pageNumberOptions = [{value: 3, name: "3"}, {value: 5, name: "5"}, {value: 10, name: "10"}, {value: 30, name: "30"}];


		vm.setPage = function(pageNum){
			vm.currentPage = pageNum;
		}

		vm.pageChanged = function(){
			$log.log('pagina cambiada a...',vm.currentPage);
		}

		vm.setItemsPerPage = function(num) {
			vm.itemsPerPage = num.value;
			vm.currentPage = 1;
				vm.numPages=Math.ceil(vm.allClientProjects.length/num.value);

			$log.log(num);
		};

		vm.setItemsPerPageProvider = function(num) {
			vm.itemsPerPage = num.value;
			vm.currentPage = 1;
			vm.numPages=Math.ceil(vm.allProviderProjects.length/num.value);
		};
		//end table pagination

		vm.sortType = 'created_at';
		vm.sortReverse = true;
		vm.sortTypeClient = '-created_at';
		vm.sortReverseClient = false;
		vm.showIp = false;
		vm.showRTParams = false;

		vm.model = {};
		var services = [];

		var user = LocalStorageFactory.getValue('user');

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

					angular.forEach(response.data.result, function(each){
						if(each.runtime_params.length > 0) vm.showRuntime = true;
					});
					vm.allClientProjects = response.data.result;
					angular.forEach(vm.allClientProjects, function(each){
						each.showSpinner = false;
					})


					//clientprojects table paginations
					vm.totalItems = vm.allClientProjects.length;
					vm.numPages = Math.ceil(vm.allClientProjects.length/vm.viewby);
					vm.pageNumberOptionsClient = vm.pageNumberOptions;
					vm.pageNumberOptionsClient.push({value: vm.totalItems, name: "Tots"});


				}
			}, function (error){
				console.log(error);
			});
			progressbar.complete();
		};

		/*
			Devuelve una imagen u otra según el tipo de servicio
		*/
		vm.getImage = function (name) {
			return ImageProviderFactory.getServiceImage(name);
		};

		vm.getProviderProjectsByPartnerId = function (partnerId){
			var progressbar = ProgressFactory.progressBarConfigure();
			progressbar.start();

			ProjectFactory.getProviderProjectsByPartnerId(partnerId).then(function(response) {
				if (response.data.status != 200 && response.status != 403) {
					toastr.error('Hi ha hagut un error al obtenir els projectes...', 'Hi ha un problema');
				} else {
					vm.allProviderProjects = response.data.response.result;

					// provprojets table pagination
					vm.totalItems = vm.allProviderProjects.length;
					vm.numPages = Math.ceil(vm.allProviderProjects.length/vm.viewby.value);
					vm.pageNumberOptions.push({value: vm.totalItems, name: "Tots"});

				}
			});
			progressbar.complete();
		};

		if (user.role === ROLES.provider.role && $state.current.name === ROLES.provider.state) {
			vm.getProviderProjectsByPartnerId(user.user.provider_id);
		}

		if (user.role === ROLES.client.role && $state.current.name === ROLES.client.state) {
			vm.getClientProjectsByPartnerId(user.user.provider_id);
		}

		vm.confirmProviderProject = function (srv) {
			/////////////////////////////////////////////////////////////////////
			ProjectFactory.confirmProviderProject(srv).then(function(response){
				if (response.status === 200) {
					srv.status = 3;
				} else {
					toastr.error("No s'ha pogut confirmar el Servei...", 'Hi ha un error');
				}
			});
		};

		vm.disableProviderProject = function (srv) {
			/////////////////////////////////////////////////////////////////////
			ProjectFactory.disableProviderProject(srv).then(function(response){
				if (response.status === 200) {
					toastr.info('Projecte deshabilitat correctament', 'Deshabilitar projecte');
					$state.reload();
				} else {
					toastr.error("No s'ha pogut desactivar el Servei...", 'Hi ha un error');
				}
			});
		};

		vm.denyConfirmedProject = function(srv) {
			ProjectFactory.denyProviderProject(srv).then(function(response){
				if (response.status === 200) {
					toastr.info('El Projecte ha estat denegat correctament', 'Denegació de Projecte');
					ngDialog.close();
					$state.reload();
				}
			});
		}

		vm.reacceptConfirmedProject = function(srv) {
			ProjectFactory.reacceptProviderProject(srv).then(function(response){
				if (response.status === 200) {
					toastr.success('El Projecte ha estat Reacceptat correctament', 'Reacceptació de Projecte');
					$state.reload();
				}
				$state.reload();
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
		vm.runProject = function (srv) {
			srv.showSpinner = true;
			// var progressbar = ProgressFactory.progressBarConfigure();
			// progressbar.start();
			ProjectFactory.runProject(srv._id).then(function (response){
				// $log.log('running project::: ', response);
				if (response.status === 200) {
					var internalPromise = $interval(function(){
						ProjectFactory.getProjectState(srv._id).then(function(response){
							// $log.log('getProjectState::: ', response);
							if (response.data.status === 5) {
								srv.showSpinner = false;
								$interval.cancel(internalPromise);
								toastr.success('Projecte arrencat correctament', 'Arrencar Serveis');
								vm.getClientProjectsByPartnerId(user.user.provider_id);
							}
						}, function(error){
							console.log(error);
						});
					}, 30000);
				}


				//si el projecte ja està running
				if (response.status === 409) {
					srv.showSpinner = false;
					var backmessage;
					if ($translate.use() == 'CAT') {
						backmessage = response.data.message.ca;
					} else if ($translate.use() == 'CAST') {
						backmessage = response.data.message.es;
					}
					srv.status = response.data.status;
					toastr.success(backmessage, response.data.code);
					vm.getClientProjectsByPartnerId(user.user.provider_id);
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
		vm.stopProject = function (srv) {
			srv.showSpinner = true;
			ProjectFactory.stopProject(srv._id).then(function (response){
				// $log.log('stopping project::: ', response);
				if (response.status === 200) {
					var internalPromise = $interval(function(){
						ProjectFactory.getProjectState(srv._id).then(function(response){
							// $log.log('getProjectState::: ', response);
							if (response.data.status === 6) {
								srv.showSpinner = false;
								$interval.cancel(internalPromise);
								toastr.success('Projecte aturat correctament', 'Aturar Serveis');
								vm.getClientProjectsByPartnerId(user.user.provider_id);
							}

						}, function (error){
							console.log(error);
						});
					}, 8000);

				}


				//si el projecte ja està running
				if (response.status === 409) {
					srv.showSpinner = false;
					var backmessage;
					if ($translate.use() == 'CAT') {
						backmessage = response.data.message.ca;
					} else if ($translate.use() == 'CAST') {
						backmessage = response.data.message.es;
					}
					srv.status = response.data.status;
					toastr.success(backmessage, response.data.code);
					vm.getClientProjectsByPartnerId(user.user.provider_id);
				}



			});
		};

		vm.deleteProject = function(id){
			ProjectFactory.deleteProject(id).then(function(response){
				if(response.status===200){
					// $location.path("/clientprojects");
					toastr.info("Projecte eliminat correctament", "Eliminar Projecte");
					$state.reload();
				}else{
					toastr.error("No s'ha pogut borrar el projecte");
				}
				vm.closeDialog();
			});
		};

		vm.hasChanged = function(){
			var css_selected =  angular.element("selected");
			for (var i = 0; i<=css_selected.length; i++){
				if (css_selected[0] != null){
					css_selected[0].className = "";
				}

			}
		};

		vm.getLiteralStatus = function(status){
			return LiteralFactory.getLiteralStatus(status);
		};

		vm.getStatusClass = function(status){
			return LiteralFactory.getStatusClass(status);
		};

		vm.getProjectState = function(id){
			ProjectFactory.getProjectState(id).then(function(response){
				$log.log(response);
			});
		};

		if ($stateParams.id) {
			vm.getProjectById($stateParams.id);
		}

		vm.startSpin = function() {
			usSpinnerService.spin('spinner-1');
		};

		vm.stopSpin = function() {
			usSpinnerService.stop('spinner-1');
		};

		//Instantiate service button (as a client), pass the service data and open dialog
		vm.instantiateService = function(srv) {
			var service_id = srv.services[0].service._id;
			ServiceFactory.instantiateService(service_id).then(function(response) {
				var dataToSend = {
					json: response.data,
					service_id: service_id,
					project_id: srv._id,
					srv: srv
				}
				ShareDataFactory.setData(dataToSend);
				launchDialog();
			});
		};

		//launch dialog
		function launchDialog () {
			ngDialog.open({
				template: 'app/services/instantiateService/instantiateSrv-dialog.tpl.html',
				className: 'ngdialog-theme-default',
				controller: 'InstantiateServiceController',
				controllerAs: 'instancesrv'
			});
		}

		//confirm message for deleting project as a Client
		vm.confirmDeleteProject = function(project) {
			vm.projectToRemove = project;
			ngDialog.open({
				template: 'app/projects/client/delete-project/delete_project.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'delete-project',
				controller: 'ProjectController',
				data: vm
			});
		};

		//confirm message for denying project
		vm.confirmDenyProject = function(project) {
			vm.projectToDeny = project;
			ngDialog.open({
				template: 'app/projects/provider/denyproject/deny_project.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'deny-project',
				controller: 'ProjectController',
				data: vm
			});
		};

		//close dialog
		vm.closeDialog = function() {
			ngDialog.close();
		};

		//launch createServiceDialog
		vm.goCreateServiceDialog = function() {
			ngDialog.open({
				template: 'app/projects/create_service/createService/createServiceDialog.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'create-service',
				controller: 'PublishSrvController',
				controllerAs: 'createproj'
			});
		};

		//launch pricing Dialog
		vm.goPricingDialog = function(srv) {
			ngDialog.open({
				template: 'app/projects/pricing/pricing.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'pricing',
				controller: 'PricingController',
				controllerAs: 'pricing',
				data: srv
			});
		};

		setPopover($translate.use());

		function setPopover(lang) {
			var x;
			if (lang == 'CAST') {
				x = $sce.trustAsHtml('<span class="text text-warning"><i class="fa fa-warning"></i></span>&nbsp;&nbsp;<span class="text text-danger">Póngase en contacto con el proveedor del Servicio.</span>');
			} else if (lang == 'CAT'){
				x = $sce.trustAsHtml('<span class="text text-warning"><i class="fa fa-warning"></i></span>&nbsp;&nbsp;<span class="text text-danger">Possis en contacte amb el proveïdor del Servei.</span>');
			}
			vm.htmlPopover = x;
		}

		$scope.$on('setLang', function (event, data){
			setPopover(data);
		});

	}

})();
