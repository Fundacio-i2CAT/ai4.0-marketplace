(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ConnectionFactory', [function (){

			var host = "http://anella.i2cat.net:3000/";

			/*
			var headers = {
				'Content-Type': 'application/json; charset=utf-8',
				'X-Token': getToken()
			}	
		
			function getToken() {
				var security; //get data from cookie or localstorage
				if (security) token = security.token;
				return token;	
			}

			function http(url, method, extraParams, data) {
	            var headers = headersFn();
	            return $http({
	                method: method,
	                url: validUrl(url, extraParams),
	                data: data,
	                config: {
	                    cache: true
	                },
	                headers: headers
	            });
	        }*/

			return {
				host: host
			};


		}]);

})()