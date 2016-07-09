(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr', 'CurrentUserFactory', 'UserFactory'];

		function LoginController ($location, toastr, CurrentUserFactory, UserFactory){
			var vm = this;
			vm.credentials = {};
			vm.paladire = null;

			//fake login
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
						//sessionStorage y $emit userrole
						CurrentUserFactory.setUser(response.data);
						toastr.success("Hola, " + user.user_name, 'Accés correcte');
						$location.path('catalog');		
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