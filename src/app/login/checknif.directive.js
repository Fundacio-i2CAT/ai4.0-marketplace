(function() {
	'use strict';

	angular
		.module('marketplace')
		.directive('checknif', checknif);

		checknif.$inject = ['DataValidationFactory'];
		function checknif (DataValidationFactory) {
			var directive = {
				restrict: 'A',
				scope: false,
				link: function (scope, element, attrs) {
					scope.showNifError = undefined;
					element.on('blur change keyup keypress', function(event){
						var temp;
						var nifRegex = DataValidationFactory.nif_validation;
						var nif = event.currentTarget.value;

						if(nif != null && nif != undefined && nif != '') {
							var correctNif = nifRegex.test(nif);
							if (!correctNif) {
								temp = true;
							} else {
								//if nif format is correct, then we validate the letter of nif
								temp = DataValidationFactory.checkNifLetter(nif);
							}
							scope.showNifError = temp;
						}
					});
				}
			};
			return directive;
		}
})();