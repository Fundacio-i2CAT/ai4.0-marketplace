(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ConnectionFactory', ConnectionFactory);
	ConnectionFactory.$inject = [];

	function ConnectionFactory (){

		var production = "http://anella.i2cat.net:8010/";
		var development = "http://anella.i2cat.net:9999/";
		var localHostDavid = "http://192.168.10.70:8010/";
		var localHostDavid2 = "http://192.168.122.1:8010/";

		return {
			host: development
		};


	}

})()