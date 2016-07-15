(function(){
	'use strict';
	angular
		.module('marketplace')
		.directive('showHover', showHover);

	showHover.$inject = [];
	
	/**
	* Directiva que proporciona el template del header de la aplicacion
	*/
	function showHover(){
		var directive = {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.on('click', function(){
					console.log(scope, element, attrs);
				});
			}
		};
		return directive;
	}

})()