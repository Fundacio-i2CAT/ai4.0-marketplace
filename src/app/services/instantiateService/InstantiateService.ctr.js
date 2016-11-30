(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('InstantiateServiceController', InstantiateServiceController);

		InstantiateServiceController.$inject = [];
		function InstantiateServiceController() {
			var vm = this;

			vm.txt = "Hi InstantiateServiceController";
		}
})();