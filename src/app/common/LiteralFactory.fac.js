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
				case 1: output = "PENDENT";
					break;
				case 3: output = 'CONFIRMAT';
					break;
				case 5: output = 'ACTIU';
					break;
				case 6: output = 'PARAT';
					break;
			}
			return output;
		}

		return literalFactory;
	}


})();