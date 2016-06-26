(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('ServiceController', ServiceController);

		ServiceController.$inject = ['ServicesMock', '$timeout', 'ngProgressFactory', 'toastr', '$log'];
		function ServiceController (ServicesMock, $timeout, ngProgressFactory, toastr, $log){
			var vm = this;
			vm.txt = 'Services Controller';
			vm.services = ServicesMock;
			vm.showTable = showTable;
			vm.showToast = showToast;

			function progressBarConfigure (){
				var progressbar = ngProgressFactory.createInstance();
				progressbar.setHeight('4px');
				progressbar.setColor('#00802b');

				return progressbar;
			}

			function showTable(){
				vm.progressbar = progressBarConfigure();
				
				vm.progressbar.start();
				$timeout(function(){
					vm.progressbar.complete();
					vm.show = true;
				}, 2000);
				
			}
			vm.showTable();

			function showToast(service) {
				toastr.info('Confirmació enviada', service.name);
				$log(service);
				
			}
		
		}

})();