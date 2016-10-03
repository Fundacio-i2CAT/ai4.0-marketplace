(function() {
	'use strict';

	angular
		.module('marketplace')
		.directive('checkmail', checkmail);

		checkmail.$inject = [];
		function checkmail () {
			var directive = {
				restrict: 'A',
				scope: false,
				link: function (scope, element, attrs){
					element.on('blur', function (event){	
						var temp,
							mailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/,					
							mail = event.currentTarget.value;

						if (mail !== null && mail !== undefined && mail != '') {
							var correctMail = mailRegex.test(mail);
							if (!correctMail) {
								temp = true;
							} else {
								temp = false;
							}
							scope.showMailError = temp;	
						}
					});
				}
			};
			return directive;
		}
})();