(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('UserController', UserController);

	UserController.$inject = ['UserFactory'];
	
	function UserController (UserFactory){
		var vm = this;
		vm.openedSession;
		vm.savedUser;
		vm.deletedSession;
		vm.obtainedUser;

		//get all users
		vm.getAllUsers = function(){
			UserFactory.getAllUsers().then(function(response) {
				if (!response.success) {
					//do something like show toastr
				} else {
					vm.allUsers = response.result;	
				}
			});
		};

		//open session for this user
		vm.openSession = function(user) {
			UserFactory.openSession(user).then(function(response) {
				if (response.success === false) {
					//todo
				} else {
					vm.openedSession = response;
				}
			});
		};	
		
		//store user in bbdd
		vm.setuser = function (user) {
			UserFactory.setUser(user).then(function(response) {
				if (response.success === false) {
					//todo
				} else {
					vm.savedUser = response;
				}
			});
		};

		//delete session for current user
		vm.deleteSession = function () {
			UserFactory.deleteSession().then(function(response){
				if (response.success === false) {
					//todo
				} else {
					vm.deletedSession = response;
				}
			});
		};

		//get user by name
		vm.gerUserByName = function () {
			UserFactory.getUserByName().then(function(response){
				if (response.success === true) {
					//do something
				} else {
					vm.currentUser = response.result;
				}
			});
		}

		//llamada al getAll de users
		vm.getAllUsers();

	}

})(); 