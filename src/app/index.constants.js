(function(){
	'use strict';

	angular
		.module('marketplace')
		.constant('ROLES', {
			provider: {
				role: 'Partner.Provider',
				state: 'provprojects'
			},
			client: {
				role: 'Partner.Client',
				state: 'clientprojects'
			}
		});

})();