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
			UserFactory.getUserById(temp.user_id)
				.then(function (response){
					var role = response.data.partner._cls;
					currentUser.user = temp;
					currentUser.user.name = response.data.user_name;
					currentUser.role = role;
					LocalStorageFactory.setValue('user', currentUser);
					$rootScope.$broadcast('userrole', currentUser);
				});
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
			getUser:					getUser,
			setUser:					setUser,
			removeCurrentUser:			removeCurrentUser,
			setProviderRole:			setProviderRole,
			getRole:					getRole,
			setClientRole:				setClientRole,
			setLocalStorageCurrentUser:	setLocalStorageCurrentUser
		};

	}
})();
