(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$rootScope', '$location', 'toastr', 'CurrentUserFactory', 'UserFactory', 'LocalStorageFactory'];

		function LoginController ($rootScope, $location, toastr, CurrentUserFactory, UserFactory, LocalStorageFactory){
			var vm = this;
			vm.credentials = {};
			vm.paladire = null;

			/*vm.doLoginFake = function () {
				var user = {
					username: vm.credentials.username,
					password: vm.credentials.password
				};
				if (user.username === 'user.prov1' && user.password === 'user.prov1') {
					toastr.info('Hola de nou ' + user.username);
					CurrentUserFactory.setUser(user);
					$location.path('services');
				} else {
					toastr.info('El username o el password no coincideixen', 'Error al accedir');
					$location.path('login');
					vm.credentials = {};
				}
			};*/

			vm.doLogin = function (){
				var user = {
					user_name: vm.credentials.username,
					password: vm.credentials.password
				};
				UserFactory.openSession(user).then(function(response){
					if (response.data.status === 'fail') {
						toastr.error("L'usuari i el password no coincideixen.", 'Accés incorrecte');
						vm.credentials = {};
					} else {
						toastr.success("Hola, " + user.user_name, 'Accés correcte');
						CurrentUserFactory.setUser(response.data);
						LocalStorageFactory.setValue('user', response.data);
						$location.path('catalog');
						$rootScope.$digest();
					}	
				})

			};

			vm.doLogout = function () {
				 CurrentUserFactory.removeCurrentUser();
				 LocalStorageFactoryremoveItem('user');
				 $location.path('catalog');
			}




		}

})();