(function() {
	'use strict';

	angular
		.module('marketplace')
		.directive('checknif', checknif)

		checknif.$inject = [];
		function checknif () {
			var directive = {
				restrict: 'A',
				scope: false,
				link: function () {
					element.on('blur', function(event){
						var temp;
						var nifRegex = /^\d{8}[a-zA-Z]$/;
						var nif = event.currentTarget.value;
						var correctNif = nifRegex.test(nif);

						if (!correctNif) {
							alert('no és correcte');
						} else {
							alert('és un nif correcte ');
						}
					});
				}
			};
			return directive;
		}
})();