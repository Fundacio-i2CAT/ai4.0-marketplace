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
			templateUrl: 'app/main/navbar.tpl.html',
			link: function (scope, element, attrs) {
				/*
					Tancar collapsed menu despres de clicar un menu item
				*/
				angular.element('a').on('click', function (){
					var but = angular.element('#bs-example-navbar-collapse-1')
					but.collapse('hide');
				})

			}
		};
		return directive;
	}

})()