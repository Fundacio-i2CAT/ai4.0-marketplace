(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('cat', {
					'HELLO': 'Hola a tothom'
				})

				.translations('es', {
					'HELLO': 'Hola a todo el mundo'
				})

				.translations('en', {
					'HELLO': 'Hello to everybody'
				})
				.preferredLanguage('cat');
		}]);

})();