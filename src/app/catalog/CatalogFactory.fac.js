(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('CatalogFactory', CatalogFactory);

	CatalogFactory.$inject = ['$http', 'ConnectionFactory'];
	function CatalogFactory($http, ConnectionFactory) {
		var catalogFactory = {};
		catalogFactory.getAllTypes = getAllTypes;
		catalogFactory.getAllServices = getAllServices;

		var host = ConnectionFactory.host;

		/*
			serviceRest - get all services types
			api/services/types
		*/
		function getAllTypes() {
			var catalogServicesTypesUrl = [host, 'api/services/types'].join('');
			return $http.get(catalogServicesTypesUrl).then(handleSuccess, handleError);
		}

		/*
			serviceRest - get all services
			api/services
		*/

		function getAllServices() {
			var allServicesUrl = [host, 'api/services'].join('');
			return $http.get(allServicesUrl).then(handleSuccess, handleError);
		}

		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function handleSuccess(response){
			return response;	
		}

		function handleError(error){
			return error;
		}

		return catalogFactory;
	}
})();