(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('NewProjectController', NewProjectController);

		NewProjectController.$inject = ['CurrentUserFactory', 'ROLES', '$log'];

		function NewProjectController(CurrentUserFactory, ROLES, $log) {
			var vm = this;

			vm.getCurrentClientId = function() {
				var user = CurrentUserFactory.getCurrentUser();
				if (user.role === ROLES.client.role) {
					var currentUser = user.user.user_id;
					$log.log('NewProjectController:::', currentUser);
				}
			};

			vm.getCurrentClientId();

		}

})();