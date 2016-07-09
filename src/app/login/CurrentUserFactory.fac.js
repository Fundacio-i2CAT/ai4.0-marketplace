(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('CurrentUserFactory', CurrentUserFactory);

	CurrentUserFactory.$inject = ['$log', 'LocalStorageFactory', '$rootScope', 'UserFactory'];
	function CurrentUserFactory($log, LocalStorageFactory, $rootScope, UserFactory) {
		var currentUser = {
			user: {},
			role: {}
		};


		function getUser() {
			return currentUser;
		}

		function setUser(user) {
			//temporal hasta que back devuelva el objeto user entero after login
			//obtener el role del usuario loggeado
			var temp = user;
			UserFactory.getUserById(temp.user_id).then(function (response){
				$log.log(response);
				// LocalStorageFactory.setValue('user', response.data);
				// $rootScope.$broadcast('userrole', response.data);
			});
			//final de temporal

			currentUser.user = user;
		}

		function removeCurrentUser() {
			currentUser.user = {};
			currentUser.role = {};
		}

		function setProviderRole(){
			currentUser.role = 'provider';
		}

		function setClientRole(){
			currentUser.role = 'client';
		}

		function getRole() {
			return (currentUser.role) ? currentUser.role : null;
		}
		return {
			getUser: getUser,
			setUser: setUser,
			removeCurrentUser: removeCurrentUser,
			setProviderRole: setProviderRole,
			getRole: getRole,
			setClientRole: setClientRole
		};

	}
})();
