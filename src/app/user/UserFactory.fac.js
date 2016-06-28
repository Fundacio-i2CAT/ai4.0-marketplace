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


		//get all users
		function getAllUsers () {
			return $http.get(getAllUsersUrl).then(handleSuccess, handleError('Error getting all users.'));
		}

		//open session
		function openSession(user) {
			var sessionUser = {
				password: user.user_name,
				user_name: user.user_name
			};
			return $http.post(openSessionUrl, sessionUser).then(handleSuccess, handleError('Error opening user session.'));
		}

		//setUser
		function setUser (user){
			var userInfo ={
					"password": "user3.prov1",
					"user_name": "user3.prov1",
					"email": "user3.prov1@prov1.com"
				};
			return $http.post(setUserUrl, userInfo).then(handleSuccess, handleError('Error al gravar el Usuario.'));

		}

		// delete opened session
		function deleteSession(){
			return $http.delete(deleteSessionUrl).then(handleSuccess, handleError('Error al eliminar la session.'));
		}

		//////////////////////////private functions
		function handleSuccess(response){
			return response.data;	
		}

		function handleError(error){
			return function(){
				return {success: false, message: error};
			}
		}

		return factory;	

	}
})();