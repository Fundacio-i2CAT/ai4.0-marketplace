(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ProviderFactory', ProviderFactory);

		ProviderFactory.$inject = ['$http', 'ConnectionFactory'];
		function ProviderFactory($http, ConnectionFactory) {
			var factory = {};
			var host = ConnectionFactory.host;

			factory.getProviderById = getProviderById;

			function getProviderById(id) {
				var url = [host,'api/providers/',id].join('');
				return $http.get(url).then(handleSuccess, handleError);
			}


			///////////////////////////////   private functions   ///////////////////////////////////////////////////

			function handleSuccess(response){
				return response;	
			}

			function handleError(error){
				
				return error;
			}

			return factory;

		}
})();