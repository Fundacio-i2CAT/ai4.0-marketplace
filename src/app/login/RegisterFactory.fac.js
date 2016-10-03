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


		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function checkNifLetter(nif) {
			var nifError,
				listOfLetters = 'TRWAGMYFPDXBNJZSQVHLCKET',
				letter,
				position,
				letterOk,
				number = nif.substring(0,8),
				letter = nif.substring(nif.length-1);

			if (number && number > 0 && number < 99999999) {
				position = number % 23;
				letterOk = listOfLetters.substring(position, position+1);

				if (letterOk == letter) {
					nifError = false;	
				} else {
					nifError = true;
				}
				
			} else {
				nifError = true;
			}
			return nifError;
		}

		function handleSuccess(response){
			return response;	
		}

		function handleError(error){
			return error;
		}

		return {
			doRegister: doRegister,
			checkNifLetter: checkNifLetter
		};

	}

})();