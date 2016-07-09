(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr', 'CurrentUserFactory', 'UserFactory', 'LocalStorageFactory'];

		function LoginController ($location, toastr, CurrentUserFactory, UserFactory, LocalStorageFactory){
			var vm = this;
			vm.credentials = {};
			// vm.paladire = null;

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
				LocalStorageFactory.removeItem('user');
				toastr.info("Sessió tancada correctament.", 'Adéu');
				$location.path('login');
			}


		}

})();