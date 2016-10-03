(function() {
	'use strict';

	angular
		.module('marketplace')
		.directive('checknif', checknif);

		checknif.$inject = [];
		function checknif () {
			var directive = {
				restrict: 'A',
				scope: false,
				link: function (scope, element, attrs) {
					scope.showNifError = undefined;
					element.on('blur', function(event){
						var temp;
						var nifRegex = /(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))/;
						var nif = event.currentTarget.value;

						if(nif != null && nif != undefined && nif != '') {
							var correctNif = nifRegex.test(nif);
							if (!correctNif) {
								temp = true;
							} else {
								temp = false;
							}
							scope.showNifError = temp;
						}

						
					});
					
				}
			};
			return directive;
		}
})();