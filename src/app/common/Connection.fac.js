(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ConnectionFactory', ConnectionFactory);
	ConnectionFactory.$inject = [];

	function ConnectionFactory (){
		
		// var development = "http://anella.i2cat.net:9999/";
		var development = "http://localhost:9999/";
		return {
			host: development
		};


	}

})()