(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('en', {
					'HELLO': 'Hello to everybody'
				});
		}]);

})();
				