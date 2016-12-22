(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('UserController', UserController);

	UserController.$inject = ['UserFactory', 'CurrentUserFactory', '$log', 'LocalStorageFactory'];

	function UserController (UserFactory, CurrentUserFactory, $log, LocalStorageFactory){
		var vm = this;
		vm.openedSession;
		vm.savedUser;
		vm.deletedSession;
		vm.obtainedUser;

		function setActive(userlist) {
			angular.forEach(userlist, function (user) {
				if(user.admin == false) {
					user.isActive = false;
				} else {
					user.isActive = true;
				}
			});
		}

		//get all users
		vm.getAllUsers = function(){
			UserFactory.getAllUsers().then(function(response) {
				if (response.status == 200) {
					setActive(response.data.result);
					vm.allUsers = response.data._embedded.people;
				} else {
					//do something like show toastr
				}
			});
		};

		//open session for this user
		vm.openSession = function(user) {
			var sessionUser = {
				password: user.user_name,
				user_name: user.user_name
			};
			UserFactory.openSession(sessionUser).then(function(response) {
				if (response.data.status === 'fail') {
					//todo
				} else {
					CurrentUserFactory.setUser(response.data);
					LocalStorageFactory.setValue('user', response.data);
					vm.openedSession = response.data;
				}
			});
		};

		//store user in bbdd
		vm.setuser = function (user) {
			UserFactory.setUser(user).then(function(response) {
				if (response.data.status === 'fail') {
					//todo
				} else {
					vm.savedUser = response.data;
				}
			});
		};

		//delete session for current user
		vm.deleteSession = function () {
			UserFactory.deleteSession(CurrentUserFactory.getUser()).then(function(response){
				if (response.data.status === 'fail') {
					$log.log('Ha petado', response);
				} else {
					vm.deletedSession = response.data;
				}
			});
		};

		//get user by name
		vm.gerUserByName = function () {
			UserFactory.getUserByName().then(function(response){
				if (response.data.status === 'fail') {
					//do something
				} else {
					vm.currentUser = response.data.result;
				}
			});
		}

		vm.getCurrentUser= function() {
			vm.userr = CurrentUserFactory.getUser() || {};
		}


		//llamada al getAll de users
		vm.getAllUsers();

		vm.activateUser = function (user) {
			vm.allUsers.forEach(function (each){
				if (each._id === user._id) {
					each.isActive = true;
				}
			});
		};

		vm.deActivateUser = function (user) {
			vm.allUsers.forEach(function (each){
				if (each._id === user._id) {
					each.isActive = false;
				}
			});
		};



	}

})();
