(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('LiteralFactory', LiteralFactory);

	LiteralFactory.$inject = [];

	function LiteralFactory() {
		var literalFactory = {};

		literalFactory.getLiteralStatus = getLiteralStatus;

		function getLiteralStatus(status) {
			var output = null;
			
			switch(status) {
				case 1: output = 'Pendent';
					break;
				case 3: output = 'Confirmat';
					break;
				case 5: output = 'Actiu';
					break;
				case 6: output = 'Parat';
					break;
			}
			return output;
		}

		return literalFactory;
	}


})();