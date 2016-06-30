(function() {
	'use strict' ;

	angular
		.module('marketplace')
		.factory('UserFactory', UserFactory);

	UserFactory.$inject = ['$http', 'ConnectionFactory'];

	function UserFactory($http, ConnectionFactory) {
		var host = ConnectionFactory.host;
		var getAllUsersUrl = [host, 'api/users'].join(''),
			openSessionUrl = [host,'api/session'].join(''),
			setUserUrl = [host, 'api/users'].join(''),
			deleteSessionUrl = [host, 'api/session'].join('');


		var factory = {};
		factory.getAllUsers = getAllUsers;
		factory.openSession = openSession;
		factory.setUser = setUser;
		factory.deleteSession = deleteSession;
		factory.getUserByName = getUserByName;


		//get all users
		function getAllUsers () {
			return $http.get(getAllUsersUrl).then(handleSuccess, handleError);
		}

		//open session
		function openSession(user) {
			return $http.post(openSessionUrl, user).then(handleSuccess, handleError);
		}

		//setUser
		function setUser (user){
			var userInfo ={
					"password": "user3.prov1",
					"user_name": "user3.prov1",
					"email": "user3.prov1@prov1.com"
				};
			user = userInfo;
			return $http.post(setUserUrl, user).then(handleSuccess, handleError);

		}

		// delete opened session
		function deleteSession(){
			return $http.delete(deleteSessionUrl).then(handleSuccess, handleError);
		}

		//getUserByName
		function getUserByName(name){
			var url = [host, 'api/users?user_name=', name].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}




		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function handleSuccess(response){
			return response;	
		}

		function handleError(error){
			/*return function(){
				return {success: false, message: error};
			};*/
			return error;
		}

		return factory;	

	}
})();