(function() {
	'use strict';

	angular
		.module('marketplace')
		.factory('RegisterFactory', RegisterFactory);

	RegisterFactory.$inject = ['$http', 'ConnectionFactory'];

	function RegisterFactory($http, ConnectionFactory) {
		var host = ConnectionFactory.host;

		var registerUrl = [host, 'api/register'].join('');

		function doRegister(credentials) {
			if (credentials.legal === "true") credentials.legal = true
			else credentials.legal = false;

			return $http.post(registerUrl, credentials).then(handleSuccess, handleError);
		}

		function recoverPassword(mail) {
			var recoverUrl = [host, 'api/change/password'].join('');
			return $http.post(recoverUrl, {email: mail}).then(handleSuccess, handleError);
		}

		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function handleSuccess(response){
			return response;
		}

		function handleError(error){
			return error;
		}

		return {
			doRegister: doRegister,
			recoverPassword:recoverPassword
		};

	}

})();
