(function() {
	'use strict';

	angular
		.module('marketplace')
		.directive('checknif', checknif);

		checknif.$inject = ['RegisterFactory'];
		function checknif (RegisterFactory) {
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
								//if nif format is correct, then we validate the letter of nif
								temp = RegisterFactory.checkNifLetter(nif);
							}
							scope.showNifError = temp;
						}

						
					});
					
				}
			};
			return directive;
		}
})();