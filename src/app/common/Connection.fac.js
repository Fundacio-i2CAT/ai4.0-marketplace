(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ConnectionFactory', ConnectionFactory);
	ConnectionFactory.$inject = [];

	function ConnectionFactory (){

		var hostProd = "http://anella.i2cat.net:8010/";
		var hostDev = "http://anella.i2cat.net:9999/";
		var localHostDavid = "http://192.168.10.70:8010/";

		return {
			host: localHostDavid
		};


	}

})()