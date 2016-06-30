(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceController', ServiceController);

		ServiceController.$inject = ['ServicesMock', '$timeout', 'ngProgressFactory', 'toastr'];
		function ServiceController (ServicesMock, $timeout, ngProgressFactory, toastr){
			var vm = this;
			vm.txt = 'Services Controller';
			vm.services = ServicesMock;
			vm.showTable = showTable;
			vm.showToast = showToast;
			vm.isFilterActive = false;

			function progressBarConfigure (){
				var progressbar = ngProgressFactory.createInstance();
				progressbar.setHeight('4px');
				progressbar.setColor('#ff1ab3');

				return progressbar;
			}

			function showTable(){
				vm.progressbar = progressBarConfigure();
				
				vm.progressbar.start();
				$timeout(function(){
					vm.progressbar.complete();
					vm.show = true;
				}, 1500);
				
			}
			vm.showTable();

			function showToast(service) {
				toastr.info('Confirmació enviada', service.name);
				
			}

			vm.displayed = ServicesMock;


		}

})();