(function(){
	'use strict';

	angular
		.module('marketplace')
		.constant('ROLES', {
			provider: {
				role: 'User.Provider',
				state: 'provprojects'
			},
			client: {
				role: 'User.Client',
				state: 'clientprojects'
			},
			admin: {
				role: 'User.Administrator',
				state: 'users'
			}
		});

})();
