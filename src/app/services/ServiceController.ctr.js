(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceController', ServiceController);

		ServiceController.$inject = ['ServicesMock'];
		function ServiceController (ServicesMock){
			var vm = this;
			vm.txt = 'Services Controller';

			vm.mockService = {};
			vm.mockService.data = ServicesMock;

		
		}

})();