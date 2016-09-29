(function() {
	'use strict';

		angular
			.module('marketplace')
			.controller('RegisterController', RegisterController);

		RegisterController.$inject = ['RegisterFactory', '$log'];

		function RegisterController (RegisterFactory, $log) {
			var vm = this;
			var passwordOk;
			vm.showRegisterError = false;
			vm.cif = false;
			vm.nif = false;
			/*vm.focusPassword = false;*/

			vm.setIdentification = function(value) {
				if (value === 'cif') {
					vm.cif = true;
					vm.nif = false;
				} else {
					vm.cif = false;
					vm.nif = true;
				}
			}

			function validPassword (pass, repeat_pass) {
				return pass === repeat_pass;
			}

			vm.doRegister = function(credentials) {
				//if password and repeatpassword not equals an error must be shown
				//and ask for repeat password again
				var userInfo;
				passwordOk = validPassword(credentials.password, credentials.repeatpassword);
				if (!passwordOk) {
					vm.showRegisterError = true;
					vm.credentials.repeatpassword = '';
					vm.credentials.password = '';
					return;
				} else {
					userInfo = {
						name: credentials.name,
						secondname: credentials.secondname,
						lastname: credentials.lastname,
						email: credentials.email,
						company: credentials.company,
						comp_address: credentials.comp_address,
						comp_phone: credentials.comp_phone,
						comp_position: credentials.comp_position,
						client_role: (credentials.role === 'client') ? true : false,
						provider_role: (credentials.role === 'provider') ? true : false,
						legal: (credentials.legal === 'true') ? true : false,
						password: credentials.password,
						identification_number: {
							isnif: (credentials.identification === 'nif') ? true : false,
							value: credentials.identificationValue
						}
					};
					RegisterFactory.doRegister(userInfo).then(function (response){
						$log.debug(response);
						//show message with register confirmation
					}, function (error){
						$log.debug(error);
						//show message with register error
					});
				}
			};
		}
})();