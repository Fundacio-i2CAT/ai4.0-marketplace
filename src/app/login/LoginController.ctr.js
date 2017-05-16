(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$rootScope', '$state', '$location', 'toastr', 'CurrentUserFactory', 'UserFactory', 'LocalStorageFactory', 'ngDialog', 'RegisterFactory', 'ShareDataFactory'];

		function LoginController ($rootScope, $state, $location, toastr, CurrentUserFactory, UserFactory, LocalStorageFactory, ngDialog, RegisterFactory, ShareDataFactory){
			var vm = this;
			vm.credentials = {};
			vm.loginPressed = null;
			vm.reset = null;
			vm.recover_success = false;
			vm.recover_error = false;
			vm.passNotEquals = false;
			vm.pass={};


			vm.doLogin = function (){
				vm.loginPressed = true;
				var user = {
					user_name: vm.credentials.username,
					password: vm.credentials.password
				};
				UserFactory.openSession(user).then(function(response){
					ShareDataFactory.setData(response.data.id);
					if (response.status === 401) {
						vm.loginPressed = false;
						toastr.error("L'usuari o el password no coincideixen.", 'Accés incorrecte');
						vm.credentials = {};
					} else {
						if (response.data && response.data.password == true) {
							ngDialog.open({
								template: 'app/login/reset-pass/reset-password-login-dialog.tpl.html',
								className: 'ngdialog-theme-default',
								appendClassName: 'reset-password-login',
								closeByEscape: false,
								closeByNavigation: false,
								closeByDocument: false,
								showClose: true,
								controller: 'LoginController',
								controllerAs: 'login',
								data: vm.currentUserId
							});
						} else {
							//local storage and broadcoast userrole
							CurrentUserFactory.setUser(response.data);
							toastr.success("Hola, " + response.data.user_name, 'Accés correcte');
							$location.path('catalog');
						}

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
			};

			$rootScope.$on('ngDialog.closing', function (e, $dialog) {
			    // vm.loginPressed = false;
					$state.reload();
			});

			vm.resetPassword = function (pass, chicha) {
				if (pass.new !== pass.rep) {
						vm.pass.new = '';
						vm.pass.rep = '';
						vm.differentPass = true;
						return;
				} else {
					ngDialog.close();
					var id = ShareDataFactory.getData();
					RegisterFactory.setNewPassword(vm.pass, id).then(function(response) {
						console.log(response);
						if (response && response != undefined && response.data.status_code==204) {
							$state.reload();
							toastr.success('La contrasenya s\'ha restablert correctament', 'Contrasenya restablerta');
						} else {
							toastr.info('Hi ha hagut un error al restablir la contrasenya. Pot continuar fent servir la contrasenya generada per la Plataforma.', 'Contrasenya no restablerta');

						}

					}, function (error) {
						console.log('error:::', error);
					});
				}
			};





		}

})();
