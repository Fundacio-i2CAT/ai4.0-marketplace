(function(){
	'use strict';
	angular
		.module('marketplace')
		.directive('idosnavbar', idosnavbar);

	idosnavbar.$inject = ['CurrentUserFactory'];
	
	/**
	* Directiva que proporciona el template del header de la aplicacion
	*/
	function idosnavbar(CurrentUserFactory){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/main/navbar.tpl.html',
			scope: true,
			link: function (scope, element, attrs) {

			}
		};
		return directive;
	}

})()