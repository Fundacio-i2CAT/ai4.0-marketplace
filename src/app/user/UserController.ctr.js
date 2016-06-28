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
				if (response) {
					vm.openedSession = response;
				}
			});
		};	
		
		//store user in bbdd
		vm.setuser = function (user) {
			UserFactory.setUser(user).then(function(response) {
				if (response) {
					vm.savedUser = response;
				}
			});
		};

		//delete session for current user
		vm.deleteSession = function () {
			UserFactory.deleteSession().then(function(response){
				if (response) {
					vm.deletedSession = response;
				}
			});
		};

		//llamada al getAll de users
		vm.getAllUsers();

	}



})(); 