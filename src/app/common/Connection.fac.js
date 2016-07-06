(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ConnectionFactory', ConnectionFactory);
	ConnectionFactory.$inject = [];

	function ConnectionFactory (){

		var host = "http://anella.i2cat.net:8010/";
		//var host = "http://localhost:3010/";

		/*
		var headers = {
			'Content-Type': 'application/json; charset=utf-8',
			'X-Token': getToken()
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


	}

})()