(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('es', {
					'HELLO': 'Hola a todo el mundo'
				});
		}]);

})();
				