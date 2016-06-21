(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('ca', {
					'HELLO': 'Hola a tothom'
				})
				.preferredLanguage('en');
		}]);

})();