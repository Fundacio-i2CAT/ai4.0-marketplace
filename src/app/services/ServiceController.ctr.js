(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceController', ServiceController);

		ServiceController.$inject = [];
		function ServiceController (){
			var vm = this;
			vm.txt = 'Services Controller';
		
		}

})();