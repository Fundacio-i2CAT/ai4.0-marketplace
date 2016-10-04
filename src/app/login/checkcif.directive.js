(function () {
	'use strict';

	angular
		.module('marketplace')
		.directive('checkcif', checkcif);

	checkcif.$inject = ['DataValidationFactory'];
	function checkcif(DataValidationFactory) {
		var directive = {
			restrict: 'A',
			scope: false,
			link: function(scope, element, attrs) {
				scope.showCifError = undefined;
				element.on('blur', function(event) {
					var temp,
						cifRegex = DataValidationFactory.cif_validation,
						cif = event.currentTarget.value;

					if (cif != null && cif != undefined && cif != '') {
						var correctCif = cifRegex.test(cif);
						if (!correctCif) {
							temp = true;
						} else {
							// temp = DataValidationFactory.isValidCif(cif);
							temp = DataValidationFactory.validarCIF(cif);
						}
						scope.showCifError = temp;
					}
				});
			}
		};

		return directive;
	}
})()