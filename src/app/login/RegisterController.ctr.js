(function() {
	'use strict';

	 angular
	 	.module('marketplace')
	 	.controller('RegisterController', RegisterController);

	 	RegisterController.$inject = [];

	 	function RegisterController () {
	 		var vm = this;
	 		vm.focusPassword = false;

	 		vm.doRegister = function(credentials) {
	 			console.log(credentials);
	 		}
	 	}
})();