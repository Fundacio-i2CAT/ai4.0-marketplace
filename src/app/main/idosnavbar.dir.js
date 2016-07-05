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
				// $.material.init(); //for bootstrap-material-design

				/*if ('variable' in attrs) {
					var a = attrs.variable;
					$log.log(a);
				}*/

				angular.element('a').on('click', function (){
					var but = angular.element('#bs-example-navbar-collapse-1')
					but.collapse('hide');
				})

			}
		};
		return directive;
	}

})()