(function (){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceEditController', ServiceEditController);

	ServiceEditController.$inject = ['$stateParams', '$state', 'ServiceFactory', 'ProviderFactory', 'toastr', 'ImageProviderFactory', '$log', 'CurrentUserFactory'];

	function ServiceEditController ($stateParams, $state, ServiceFactory, ProviderFactory, toastr, ImageProviderFactory, $log, CurrentUserFactory) {
		var vm = this;
		vm.currentUser = {};
		var serviceId;

		if($stateParams.id) {
			serviceId = $stateParams.id;
		}

		vm.getCurrentUser = function() {
			var currentUser = CurrentUserFactory.getCurrentUser();
			vm.currentUser = currentUser;
			$log.log(vm.currentUser);
		}

		vm.getCurrentUser();

		vm.getServiceById = function (id){
			ServiceFactory.getServiceById(id).then(function(response){
				if (response.status === 200) {
					vm.currentService = response.data;
					vm.nameProvider = response.data.provider.name;
				}
			});
		};

		vm.getProviderById = function(id) {
			ProviderFactory.getProviderById(id).then(function(response) {
				if (response.status === 200) {
					vm.currentServiceProvider = response.data;
				} else {
					toastr.error('Hi ha hagut un error al obtenir els proveïdor...', 'Hi ha un problema');
				}
			})
		};

		vm.getProviderImage = function (name) {
			return ImageProviderFactory.getProviderImage(name);
		}

		/*
			solicitar servicio desde vista detalle de Service-Catalog
		*/
		vm.goToLogin = function () {
			$state.go('login');
		};

		vm.goToProjects = function() {
			$state.go('clientprojects');
		}



		vm.getServiceById(serviceId);
	}
})();
