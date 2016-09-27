(function() {
	'use strict';

	 angular
	 	.module('marketplace')
	 	.controller('RegisterController', RegisterController);

	 	RegisterController.$inject = ['RegisterFactory'];

	 	function RegisterController (RegisterFactory) {
	 		var vm = this;
	 		var passwordOk;
	 		var showRegisterError = false;
/*	 		vm.focusPassword = false;*/

			function validPassword (pass, repeat_pass) {
				return pass === repeat_pass;
			}

	 		vm.doRegister = function(credentials) {
	 			//if password and repeatpassword not equals an error must be shown
	 			//and ask for repeat password again
	 			passwordOk = validPassword(credentials.password, credentials.repeatpassword);
	 			if (!passwordOk) {
	 				vm.showRegisterError = true;
	 				vm.credentials.repeatpassword = '';
	 				vm.credentials.password = '';
	 				return;
	 			} else {
	 				RegisterFactory.doRegister(credentials).then(function (response){
	 					console.log(response);
	 					//show message with register confirmation
	 				}, function (error){
	 					console.log(error);
	 					//show message with register error
	 				});
	 			}

	 		};
	 	}
})();