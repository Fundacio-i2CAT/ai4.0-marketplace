(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('CurrentUserFactory', CurrentUserFactory);

	CurrentUserFactory.$inject = ['$log', 'LocalStorageFactory', '$rootScope', 'UserFactory', '$location', 'ROLES'];
	function CurrentUserFactory($log, LocalStorageFactory, $rootScope, UserFactory, $location, ROLES) {
		var currentUser = {
			user: {},
			role: {}
		};


		function getCurrentUser() {
			return currentUser;
		}

		function setUser(user) {

			currentUser.user = user;
			currentUser.role = user.role;
			currentUser.user.provider_id = user.id;


			LocalStorageFactory.setValue('user', currentUser);
			$rootScope.$broadcast('userrole', currentUser);

			if (currentUser.role === ROLES.provider.role) {
				$location.path(ROLES.provider.state);
			}
			if (currentUser.role === ROLES.client.role) {
				$location.path(ROLES.client.state);
			}
			if (currentUser.role === ROLES.admin.role) {
				$location.path(ROLES.admin.state);
			}


			//temporal hasta que back devuelva el objeto user entero after login
			//obtener el role del usuario loggeado
			// var temp = user;
			// UserFactory.getUserById(temp.id)
			// 	.then(function (response){
			// 		currentUser.user = temp;
			// 		currentUser.user.name = response.data.user_name;
			// 		currentUser.role = temp.role;
			// 		currentUser.user.provider_id = response.data.partner._id;
			// 		LocalStorageFactory.setValue('user', currentUser);
			// 		$rootScope.$broadcast('userrole', currentUser);
			//
			// 		if (currentUser.role === ROLES.provider.role) {
			// 			$location.path(ROLES.provider.state);
			// 		}
			// 		if (currentUser.role === ROLES.client.role) {
			// 			$location.path(ROLES.client.state);
			// 		}
			//
			// 	});
			//final de temporal
		}

		function setLocalStorageCurrentUser(user) {
			var temp = user;
			currentUser.user = temp.user;
			currentUser.role = temp.role;
		}

		function removeCurrentUser() {
			currentUser = {};
			$rootScope.$broadcast('userrole', currentUser);
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
			getCurrentUser:				getCurrentUser,
			setUser:					setUser,
			removeCurrentUser:			removeCurrentUser,
			setProviderRole:			setProviderRole,
			getRole:					getRole,
			setClientRole:				setClientRole,
			setLocalStorageCurrentUser:	setLocalStorageCurrentUser
		};

	}
})();
