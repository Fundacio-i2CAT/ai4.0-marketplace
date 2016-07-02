(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr', 'CurrentUserFactory', 'UserFactory', '$log'];

		function LoginController ($location, toastr, CurrentUserFactory, UserFactory, $log){
			var vm = this;
			vm.credentials = {};

			/*function doLoginFake () {
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
			}*/

			vm.doLogin = function (){
				var user = {
					user_name: vm.credentials.username,
					password: vm.credentials.password
				};
				UserFactory.openSession(user).then(function(response){
					if (response.data.status === 'fail') {
						vm.credentials = {};
					} else {
						CurrentUserFactory.setUser(response.data);
						CurrentUserFactory.setProviderRole();
						$log.log(response);
						$location.path('projects');
					}	
				})

			};




		}

})();