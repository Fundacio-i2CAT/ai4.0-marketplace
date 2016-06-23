(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('UserController', UserController);

	UserController.$inject = ['$http','ConnectionFactory', '$log'];
	
	function UserController ($http, ConnectionFactory, $log){
		var vm = this;
		vm.texto = "User controller";

		var host = ConnectionFactory.host;
		var sessionUrl = host + 'api/session';

		/*var headers = {
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
				'Content-Type': 'application/json'
			};*/

		//get all users
		vm.getAllUsers = function(){
			$http.get(host + 'api/users').then(function (response){
				vm.allUsers = response.data.result;
			});
		};

		vm.openSession = function(user) {
			var userSession = {
				pasword: user.user_name,
				user_name: user.user_name
			};
			$http.post(sessionUrl, userSession).then(function (response){
				vm.openedSession = response;
			}, function (error){
				if (error) $log(error);
			});
		};

		vm.setUser = function(){
			var userInfo ={
					"password": "user3.prov1",
					"user_name": "user3.prov1",
					"email": "user3.prov1@prov1.com"
				};

			$http.post(host + 'api/users', userInfo).then(function(response){
				vm.algo = response;
			}, function (error){
				if (error) $log(error);
			})
		};	
		
		//llamada al getAll de users
		vm.getAllUsers();

	}



})(); 