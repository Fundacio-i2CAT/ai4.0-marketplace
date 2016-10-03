(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('DataValidationFactory', DataValidationFactory);

		DataValidationFactory.$inject = [];

		function DataValidationFactory () {
			var nif_validation = /(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))/;
			var cif_validation = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)?[0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;
			var mai_validation = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
			var common_validation = /^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)?[0-9A-Z]|\d{8}(-|\.)?[A-Z])$/;

			function checkNifLetter(nif) {
				var nifError,
					listOfLetters = 'TRWAGMYFPDXBNJZSQVHLCKET',
					letter,
					position,
					letterOk,
					number = nif.substring(0,8),
					letter = nif.substring(nif.length-1);

				if (number && number > 0 && number < 99999999) {
					position = number % 23;
					letterOk = listOfLetters.substring(position, position+1);

					if (letterOk == letter) {
						nifError = false;	
					} else {
						nifError = true;
					}
					
				} else {
					nifError = true;
				}
				return nifError;
			}

			return {
				nif_validation: nif_validation,
				cif_validation: cif_validation,
				mai_validation: mai_validation,
				common_validation: common_validation,
				checkNifLetter: checkNifLetter
			};
		}
})();