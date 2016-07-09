(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('CatalogController', CatalogController);
	CatalogController.$inject = ['CatalogFactory', '$location', 'ProgressFactory'];
	function CatalogController(CatalogFactory, $location, ProgressFactory) {
		var vm = this;
		vm.allService_typeServices = [];

		vm.getAllTypes = function () {
			CatalogFactory.getAllTypes().then(function (response){
				if (response.data.status === 'fail') {
					//Gestionar error
				} else {
					vm.allTypes = response.data;
				}
			});
		};

		vm.getAllServices = function () {
			var progressbar = ProgressFactory.progressBarConfigure();
			progressbar.start();

			CatalogFactory.getAllServices().then(function (response) {
				if (response.data.status === 'ok'){
					vm.allServices = response.data.result;
					progressbar.complete();
				}
			});

		};

		vm.getAllServicesByService_type = function (name) {
			var services = [], genericServices = [];
			CatalogFactory.getAllServices().then(function (response) {
				if (response.data.status === 'ok') {
					services = response.data.result;
					services.forEach(function (each) {
						if (each.service_type == name) {
							genericServices.push(each);
						}
					});
				}
			});
			vm.genericServices = genericServices;
		};

		vm.seeDetail = function (id) {
			var url = 'services/detail/' + id;
			$location.path(url);
			
			/*var service = srv;
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/app/common/modal/modal.tpl.html',
				controller: 'ModalController',
				controllerAs: 'modal',
				resolve: {
					item: function () {
						return service;
					}
				}			 	
			});*/
		};

		vm.getAllTypes();
		vm.getAllServices();
		
	}

})();