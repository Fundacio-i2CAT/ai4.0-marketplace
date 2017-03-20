(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr', 'CurrentUserFactory', 'UserFactory', 'LocalStorageFactory', '$http'];

		function LoginController ($location, toastr, CurrentUserFactory, UserFactory, LocalStorageFactory, $http){
			var vm = this;
			vm.credentials = {};
			vm.loginPressed = null;
			// vm.paladire = null;

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


		}

})();
