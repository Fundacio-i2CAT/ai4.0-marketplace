(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('CatalogController', CatalogController);
	CatalogController.$inject = ['CatalogFactory'];
	function CatalogController(CatalogFactory) {
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
			CatalogFactory.getAllServices().then(function (response) {
				if (response.data.status === 'fail') {
				} else {
					vm.allServices = response.data.result;
				}
			});
		};

		vm.getAllServicesByService_type = function (name) {
			var services = [], genericServices = [];
			CatalogFactory.getAllServices().then(function (response) {
				if (response.data.status === 'fail') {
				} else {
					services = response.data.result;
					services.forEach(function (each) {
						console.log(each);
						if (each.service_type == name) {
							genericServices.push(each);
						}
					});
				}
			});
			vm.genericServices = genericServices;
		};

		vm.getAllTypes();
		vm.getAllServices();
		
	}

})();