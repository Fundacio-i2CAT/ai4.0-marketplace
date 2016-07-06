(function (){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceEditController', ServiceEditController);

	ServiceEditController.$inject = ['$stateParams', 'ServiceFactory', 'ProviderFactory', 'toastr'];

	function ServiceEditController ($stateParams, ServiceFactory, ProviderFactory, toastr) {
		var vm = this;
		var serviceId = $stateParams.id;

		vm.getServiceById = function (id){
			ServiceFactory.getServiceById(id).then(function(response){
				if (response.status === 200) {
					vm.currentService = response.data;
				}
			});
		};

		vm.getProviderById = function(id) {
			ProviderFactory.getProviderById(id).then(function(response) {
				if (response.status === 200) {
					vm.currentServiceProvider = response.data;
				} else {
					toastr.error('Hi ha hagut un errror al obtenir els proveïdor...', 'Hi ha un problema');
				}
			})
		};




		vm.getServiceById(serviceId);
	}
})();
