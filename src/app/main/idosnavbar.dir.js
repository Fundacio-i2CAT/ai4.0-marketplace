(function(){
	'use strict';
	angular
		.module('marketplace')
		.directive('idosnavbar', idosnavbar);

	idosnavbar.$inject = ['$log'];
	
	/**
	* Directiva que proporciona el template del header de la aplicacion
	*/
	function idosnavbar($log){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/main/navbar.tpl.html',
			link: function (scope, element, attrs) {

				if ('variable' in attrs) {
					var a = attrs.variable;
					$log.log(a);
				}

				angular.element('a').on('click', function (){
					var but = angular.element('#bs-example-navbar-collapse-1')
					but.collapse('hide');
				})

			}
		};
		return directive;
	}

})()