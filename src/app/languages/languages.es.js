(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('CAST', {
					//navbar
					'CATALEG-MENU': 'Catálogo',
					//catalog
					'CATALEG': 'CATÁLOGO'
				});
		}]);

})();
				