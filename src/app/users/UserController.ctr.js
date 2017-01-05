(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('UserController', UserController);

	UserController.$inject = ['UserFactory', 'CurrentUserFactory', '$log', 'LocalStorageFactory', 'ngDialog', 'UsersMockFacltory', 'toastr'];

	function UserController (UserFactory, CurrentUserFactory, $log, LocalStorageFactory, ngDialog, UsersMockFacltory, toastr){
		var vm = this;
		vm.openedSession;
		vm.savedUser;
		vm.deletedSession;
		vm.obtainedUser;
		vm.userToEdit = {};
		vm.allUsers=[];

		vm.sortType;
		vm.sortReverse = false;

		//table pagination
		vm.viewby = 5;
		vm.currentPage = 1;
		vm.itemsPerPage = vm.viewby;
		vm.maxSize = 5;
		vm.numPages;
		vm.pageNumberOptions = [{value: 3, name: "3"}, {value: 5, name: "5"}, {value: 10, name: "10"}];


		vm.setPage = function(pageNum){
			vm.currentPage = pageNum;
		}

		vm.pageChanged = function(){
			console.log('pagina cambiada a...',vm.currentPage);
		}

		vm.setItemsPerPage = function(num) {
			vm.itemsPerPage = num.value;
			vm.currentPage = 1;
			vm.numPages=Math.ceil(vm.allUsers.length/num.value);
			console.log(num);
		}
		//end table pagination

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
					// var mockusers = UsersMockFacltory;
					// angular.forEach(mockusers, function (each, index){
					// 	vm.allUsers.push(each);
					// });

					//table pagination
					vm.totalItems = vm.allUsers.length;
					vm.numPages = Math.ceil(vm.allUsers.length/vm.viewby);
					vm.pageNumberOptions.push({value: vm.totalItems, name: "Tots"});
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

		vm.goUserDetail = function(user) {
			vm.userDetail = user;
			ngDialog.open({
				template: 'app/users/userDetail/userDetail-dialog.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'user-detail',
				controller: 'UserController',
				data: user
			});
		}

		vm.editUser = function(user) {
			vm.userToEdit = user;
			ngDialog.open({
				template: 'app/users/editUser/editUser-dialog.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'edit-user-form',
				controller: 'UserController',
				data: vm
			});
		};

		vm.updateUser = function(model) {
			UserFactory.updateUser(model).then(function(response){
				$log.log(response);
			}, function (error){
				$log.log(error);
			});
			ngDialog.close();
		};

		vm.goDeleteUser = function(user) {
			vm.userToRemove = user;
			ngDialog.open({
				template: 'app/users/confirmDeleteUser/deleteUser-dialog.tpl.html',
				className: 'ngdialog-theme-default',
				appendClassName: 'delete-user',
				controller: 'UserController',
				data: vm
			});
		};

		vm.closeDiaglog = function() {
			ngDialog.close();
		};

		vm.doDeleteUser = function(user) {
			UserFactory.deleteUser(user.id).then(function(response){
				$log.log('deleteUser::::', response);
				toastr.info('Usuari eliminat correctament','Eliminar Usuari');
				vm.getAllUsers();
			}, function(error){
				toastr.error('S\'ha produït un error i no s\'ha pogut eliminar l\'usuari','Error eliminant Usuari');
				$log.log('deleteUser error:::', error);
			});
			ngDialog.close();
		};


	}

})();
