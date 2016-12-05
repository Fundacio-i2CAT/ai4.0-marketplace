(function (){
	'use strict' ;

	angular
		.module('marketplace')
		.factory('ServiceFactory', ServiceFactory);

	ServiceFactory.$inject = ['$http', 'ConnectionFactory'];

	function ServiceFactory($http, ConnectionFactory) {
		var host = ConnectionFactory.host;

		var factory = {};
		factory.getServiceById = getServiceById;
		factory.getAllServices = getAllServices;
		factory.createService = createService;
		factory.instantiateService = instantiateService;
		factory.instantiateSrvConsumerParams = instantiateSrvConsumerParams;


		//instantiateService
		function instantiateService (id) {
			var url = [host, 'api/services/consumer/params/', id].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}

		function instantiateSrvConsumerParams (data, id) {
			var url = [host, ''].join('');
		}

		//getServiceById
		function getServiceById (id){
			var url = [host, 'api/services/', id].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}
		//Get tots els serveis
		function getAllServices (){
			var url = [host, 'api/services'].join('');
			return $http.get(url).then(handleSuccess, handleError);
		}

		function createService (srv) {
			var url = [host, 'api/services'].join('');
			return $http.post(url, srv).then(handleSuccess, handleError);

		}

		///////////////////////////////   private functions   ///////////////////////////////////////////////////
		function handleSuccess(response){
			return response;	
		}

		function handleError(error){
			/*return function(){
				return {success: false, message: error};
			};*/
			return error;
		}

		return factory;

	}
})();