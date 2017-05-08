(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr', 'CurrentUserFactory', 'UserFactory', 'LocalStorageFactory', 'ngDialog', 'RegisterFactory'];

		function LoginController ($location, toastr, CurrentUserFactory, UserFactory, LocalStorageFactory, ngDialog, RegisterFactory){
			var vm = this;
			vm.credentials = {};
			vm.loginPressed = null;
			vm.reset = null;
			vm.recover_success = false;
			vm.recover_error = false;


			vm.doLogin = function (){
				vm.loginPressed = true;
				var user = {
					user_name: vm.credentials.username,
					password: vm.credentials.password
				};
				UserFactory.openSession(user).then(function(response){
					if (response.status === 401) {
						vm.loginPressed = false;
						toastr.error("L'usuari o el password no coincideixen.", 'Accés incorrecte');
						vm.credentials = {};
					} else {
						//local storage and broadcoast userrole
						CurrentUserFactory.setUser(response.data);
						toastr.success("Hola, " + response.data.user_name, 'Accés correcte');
						$location.path('catalog');
					}
				});
			};

			vm.doLogout = function () {
				CurrentUserFactory.removeCurrentUser();
				LocalStorageFactory.removeItem('user');
				toastr.info("Sessió tancada correctament.", 'Adéu');
				$location.path('login');
			};

			vm.goResetPass = function () {
				ngDialog.open({
					template: 'app/login/reset-pass/reset-password-dialog.tpl.html',
					className: 'ngdialog-theme-default',
					appendClassName: 'reset-password',
					controller: 'LoginController',
					controllerAs: 'login'
				});
			};

			vm.sendMailRecover = function(model) {
				vm.recover_success = false;
				vm.recover_error = false;
				if (!model) {
					return;
				} else {
					RegisterFactory.recoverPassword(model).then(function (response) {
							if (response && response.status == 404) {
								vm.recover_error = true;
							}
							if (response && response.status == 204) {
								vm.recover_success = true;
							}
					});
				}
			}


		}

})();
