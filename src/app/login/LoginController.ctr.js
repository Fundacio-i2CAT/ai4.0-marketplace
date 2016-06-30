(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr', 'CurrentUserFactory'];

		function LoginController ($location, toastr, CurrentUserFactory){
			var vm = this;
			vm.logModel = {};
			vm.doLogin = doLogin;

			function doLogin () {
				var username = vm.logModel.username;
				var pass = vm.logModel.password;
				var user = {
					username: username,
					password: pass
				}
				if (username === 'admin' && pass === 'admin') {
					CurrentUserFactory.setUser(user);
					$location.path('services');
				} else {
					toastr.info('El username o el password no coincideixen', 'Error de Login');
					$location.path('login');
					vm.logModel = {};
				}
			}

			function doRegister () {
				
			}

		}

})();