(function (){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceEditController', ServiceEditController);

	ServiceEditController.$inject = ['$stateParams', 'ServiceFactory', 'ProviderFactory', 'toastr', 'ImageProviderFactory', '$log'];

	function ServiceEditController ($stateParams, ServiceFactory, ProviderFactory, toastr, ImageProviderFactory, $log) {
		var vm = this;
		var serviceId;
		
		if($stateParams.id) {
			serviceId = $stateParams.id;
		}

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
		vm.contractService = function (srv) {
			$log.log('Lo quiero', srv);
		}



		vm.getServiceById(serviceId);
	}
})();
