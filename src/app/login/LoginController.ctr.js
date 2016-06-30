(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('LoginController', LoginController);

		LoginController.$inject=['$location', 'toastr', 'CurrentUserFactory', 'UserFactory', '$log'];

		function LoginController ($location, toastr, CurrentUserFactory, UserFactory, $log){
			var vm = this;
			vm.logModel = {};
			vm.doLoginFake = doLoginFake;

			function doLoginFake () {
				var user = {
					username: vm.logModel.username,
					password: vm.logModel.password
				};
				if (user.username === 'user.prov1' && user.password === 'user.prov1') {
					toastr.info('Hola de nou ' + user.username);
					CurrentUserFactory.setUser(user);
					$location.path('services');
				} else {
					toastr.info('El username o el password no coincideixen', 'Error al accedir');
					$location.path('login');
					vm.logModel = {};
				}
			}

			vm.doLogin = function (){
				var user = {
					username: vm.logModel.username,
					password: vm.logModel.password
				};
				UserFactory.openSession(user).then(function(response){
					if (response.data.status === 'fail') {
						vm.logModel = {};
					} else {
						CurrentUserFactory.setUser(user);
						$log.log(response);
						$location.path('projects');
					}	
				})

			};




		}

})();