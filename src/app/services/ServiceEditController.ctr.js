(function (){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceEditController', ServiceEditController);

	ServiceEditController.$inject = ['$stateParams', 'ServiceFactory'];

	function ServiceEditController ($stateParams, ServiceFactory) {
		var vm = this;
		var serviceId = $stateParams.id;

		vm.getServiceById = function (id){
			ServiceFactory.getServiceById(id).then(function(response){
				if (response.status === 200) {
					vm.currentUser = response.data;
				}
			});
		};

		vm.getServiceById(serviceId);
	}
})();
