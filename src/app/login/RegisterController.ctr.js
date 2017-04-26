(function() {
	'use strict';

		angular
			.module('marketplace')
			.controller('RegisterController', RegisterController);

		RegisterController.$inject = ['RegisterFactory', '$log', 'toastr', '$state', 'DataValidationFactory', 'ngDialog'];

		function RegisterController (RegisterFactory, $log, toastr, $state, DataValidationFactory, ngDialog) {
			var vm = this;
			var passwordOk;
			vm.showRegisterError = false;
			vm.cif = false;
			vm.nif = false;
			vm.credentials = {};
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

				if (credentials.identification === 'cif') {
					var cif = credentials.identificationValue;
					var cifRegex = DataValidationFactory.cif_validation;
					var correctCif = cifRegex.test(cif);
					if (correctCif == false) {
						vm.credentials.identificationValue = '';
						vm.showCifError = true;
						toastr.error('El CIF introduït no és correcte', 'CIF Erroni');
						return;
					}
				} else {
					var nif = credentials.identificationValue;
					var nifRegex = DataValidationFactory.nif_validation;
					var correctNif = nifRegex.test(nif);
					if (correctNif == false) {
						vm.credentials.identificationValue = '';
						vm.showNifError = true;
						toastr.error('El NIF introduït no és correcte', 'NIF Erroni');
						return;
					}
				}



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
						surname: credentials.surname,
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
						if (response) {
							if (response.status === 201) {
								//show message with register confirmation
								toastr.info('Registre realitzat correctament', 'Registre correcte');
								vm.launchDialog();
							} else if (response.status === 409) {
								toastr.error("L'Usuari ja està registrat", 'Error en el registre');
							}
						}
					});
				}
			};

			//dialog for register confirmation
			//launch dialog
			vm.launchDialog = function () {
				ngDialog.open({
					template: 'app/login/confirmation/register_confirmation.tpl.html',
					className: 'ngdialog-theme-default',
					controller: 'RegisterController',
					controllerAs: 'register'
				});
			}

			vm.goCatalog = function () {
					ngDialog.close();
					$state.go('catalog');
			};


		}
})();
