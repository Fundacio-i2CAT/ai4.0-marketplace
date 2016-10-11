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


			//validar CIF
			function isValidCif(abc){
				var par = 0,
					non = 0,
					cifError = undefined,
					zz,
					nn,
					parcial,
					control,
					letras = "ABCDEFGHKLMNPQS",
					letter = abc.charAt(0);

				if (abc.length != 9 || letras.indexOf(letter.toUpperCase()) == -1) {
					cifError = true;
				} else {
					for (zz=2; zz<8; zz+=2) {
						par = par+parseInt(abc.charAt(zz));
					}

					for (zz=1;zz<9;zz+=2) {
						nn = 2*parseInt(abc.charAt(zz));
						if (nn > 9) nn = 1+(nn-10);
						non = non+nn;
					}

					parcial = par + non;
					control = (10 - ( parcial % 10));
					if (control==10) control=0;

					if (control!=abc.charAt(8)) {
						cifError = true;
					}
					cifError = false;
				}
				return cifError;
			}

			function validarCIF(texto){ 
				var pares = 0; 
				var impares = 0; 
				var suma; 
				var ultima; 
				var unumero; 
				var uletra = new Array("J", "A", "B", "C", "D", "E", "F", "G", "H", "I"); 
				var xxx; 

				texto = texto.toUpperCase(); 

				var regular = new RegExp(/^[ABCDEFGHKLMNPQS]\d\d\d\d\d\d\d[0-9,A-J]$/g); 
				if (!regular.exec(texto)) return true; 

				ultima = texto.substr(8,1); 

				for (var cont = 1 ; cont < 7 ; cont ++){ 
					xxx = (2 * parseInt(texto.substr(cont++,1))).toString() + "0"; 
					impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1)); 
					pares += parseInt(texto.substr(cont,1)); 
				} 
				xxx = (2 * parseInt(texto.substr(cont,1))).toString() + "0"; 
				impares += parseInt(xxx.substr(0,1)) + parseInt(xxx.substr(1,1)); 

				suma = (pares + impares).toString(); 
				unumero = parseInt(suma.substr(suma.length - 1, 1)); 
				unumero = (10 - unumero).toString(); 
				if(unumero == 10) unumero = 0; 

				if ((ultima == unumero) ||  (ultima == uletra[unumero])) 
					return false; 
				else 
					return true; 
			} 



			//validar NIF
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
				checkNifLetter: checkNifLetter,
				isValidCif: isValidCif,
				validarCIF: validarCIF
			};
		}
})();