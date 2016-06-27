(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr'];

		function LoginController ($location, toastr){
			var vm = this;
			vm.logModel = {};
			vm.doLogin = doLogin;

			function doLogin () {
				var username = vm.logModel.username;
				var pass = vm.logModel.password;

				if (username === 'admin' && pass === 'admin') {
					// toastr.info('Login realitzat amb èxit', 'Benvingut');
					$location.path('services');
		
				} else {
					toastr.info('El username o el password no coincideixen', 'Error de Login');
					$location.path('login');
					vm.logModel = {};
				}
			}

		}

})();