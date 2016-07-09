(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceController', ServiceController);

		ServiceController.$inject = ['ServicesMock', '$timeout', 'ProgressFactory'];
		function ServiceController (ServicesMock, $timeout, ProgressFactory){
			var vm = this;

			
			///////////////////////////////////////////////// FAKE PART will be deprecated  /////////////////////////////////////
			//remove dependences
			vm.services = ServicesMock;
			vm.showTable = showTable;
			vm.isFilterActive = false;
			vm.displayed = ServicesMock;

			function showTable(){
				var progressbar = ProgressFactory.progressBarConfigure();
				progressbar.start();

				$timeout(function(){
					progressbar.complete();
					vm.show = true;
				}, 1500);
				
			}
			vm.showTable();


		}

})();