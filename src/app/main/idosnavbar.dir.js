(function(){
	'use strict';
	angular
		.module('marketplace')
		.directive('idosnavbar', idosnavbar);

	idosnavbar.$inject = [];
	
	/**
	* Directiva que proporciona el template del header de la aplicacion
	*/
	function idosnavbar(){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/main/navbar.tpl.html'/*,
			link: function (scope, element, attrs) {
				
			}*/
		};
		return directive;
	}

})()