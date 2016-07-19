(function (){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceEditController', ServiceEditController);

	ServiceEditController.$inject = ['$stateParams', 'ServiceFactory', 'ProviderFactory', 'toastr'];

	function ServiceEditController ($stateParams, ServiceFactory, ProviderFactory, toastr) {
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
			var image = null;
			switch(name) {
				case 'Eurecat':
					image = 'logo_degradat_72.jpg';
				break;
				case 'Adam':
					image = 'Adam_72.jpg';
				break;
			}
			return image;
		}



		vm.getServiceById(serviceId);
	}
})();
