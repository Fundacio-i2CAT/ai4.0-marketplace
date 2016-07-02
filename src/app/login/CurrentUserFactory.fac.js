(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('CurrentUserFactory', CurrentUserFactory);

	CurrentUserFactory.$inject = ['$log'];
	function CurrentUserFactory($log) {
		var currentUser = {
			user: {},
			role: {}
		};

		function getUser() {
			return currentUser;
		}

		function setUser(user) {
			currentUser.user = user;
			$log.log(user);
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
