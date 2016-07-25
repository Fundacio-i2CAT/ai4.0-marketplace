(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('CAT', {
					//navbar
					'CATALEG-MENU': 'Catàleg',
					//catalog
					'CATALEG': 'CATÀLEG'
				})
				.preferredLanguage('CAT');
		}]);	

})();



/*angular.module('myApp').controller('Ctrl', ['$translate', '$scope', function ($translate, $scope) {
 
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
  };
 
}]);*/
