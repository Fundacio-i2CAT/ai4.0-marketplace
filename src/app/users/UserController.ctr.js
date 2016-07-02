(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('UserController', UserController);

	UserController.$inject = ['UserFactory', 'CurrentUserFactory', '$log'];
	
	function UserController (UserFactory, CurrentUserFactory, $log){
		var vm = this;
		vm.openedSession;
		vm.savedUser;
		vm.deletedSession;
		vm.obtainedUser;

		//get all users
		vm.getAllUsers = function(){
			UserFactory.getAllUsers().then(function(response) {
				if (response.success === false) {
					//do something like show toastr
				} else {
					vm.allUsers = response.data.result;	
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
			console.log(vm.userr);
		}


		//llamada al getAll de users
		vm.getAllUsers();

	}

})(); 