(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ConnectionFactory', ['$http', '$q', function ($scope, $q){

			var token,
				defaultUrl;

			var headers = {
				'Content-Type': 'application/json; charset=utf-8',
				'X-Token': getToken()
			}	

			/**
			* obtener el token del currentUser
			* @return el token	
			*/
			function getToken() {
				var security; //get data from cookie or localstorage
				if (security) token = security.token;
				return token;	
			}



		}]);

})()