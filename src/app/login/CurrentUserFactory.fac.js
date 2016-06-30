(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('CurrentUserFactory', CurrentUserFactory);

	CurrentUserFactory.$inject = [];
	function CurrentUserFactory() {
		var currentUser = {};

		function getUser() {
			return currentUser;
		}

		function setUser(user) {
			currentUser = user;
		}

		function removeCurrentUser() {
			currentUser = {};
		}

		return {
			getUser: getUser,
			setUser: setUser,
			removeCurrentUser: removeCurrentUser
		};

	}
})();
