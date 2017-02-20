(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('LiteralFactory', LiteralFactory);

	LiteralFactory.$inject = [];

	function LiteralFactory() {
		var literalFactory = {};

		literalFactory.getLiteralStatus = getLiteralStatus;
		literalFactory.getStatusClass = getStatusClass;

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
				case 7: output = 'ERROR'
					break;
				case 9: output = 'PENDENT'
					break;
			}
			return output;
		}

		function getStatusClass(status) {
			var className;
			switch (status) {
				case 3:
				case 6:
					className = 'label-default';
				break;
				case 9:
					className = 'label-warning';
				break;
				case 5:
					className = 'label-success';
				break;
			}

			return className;
		}





		return literalFactory;
	}


})();
