(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('CatalogController', CatalogController);
	CatalogController.$inject = ['CatalogFactory', '$location', 'ProgressFactory', 'ImageProviderFactory'];
	function CatalogController(CatalogFactory, $location, ProgressFactory, ImageProviderFactory) {
		var vm = this;
		var servicesTypes = [];

		vm.getAllTypes = function () {
			if (servicesTypes.length == 0){
				CatalogFactory.getAllTypes().then(function (response){
					if (response.status === 200) {
						vm.allTypes = response.data;
						vm.allTypes.forEach(function (each){
							var o = {};
							o.name = each.name;
							o.description = each.description;
							servicesTypes.push(o);
						});
					}
				});
			}
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
			var services = [],
				genericServices = [];
			vm.genericServices = [];

			CatalogFactory.getAllServices().then(function (response) {
				if (response.data.status === 'ok') {
					services = response.data.result;
					services.forEach(function (each) {
						if (each.service_type == name) {
							genericServices.push(each);
						}
					});
					vm.genericServices = genericServices;
				}
			});
		};

		vm.seeDetail = function (id) {
			var url = 'services/detail/' + id;
			$location.path(url);
		};

		/*
			Devuelve una imagen u otra según servicio
		*/
		vm.getImage = function (name) {
			return ImageProviderFactory.getServiceImage(name);
		};

		vm.getServiceLogo = function (name) {
			return ImageProviderFactory.getCatalogServiceLogo(name);
		};

		vm.getDescriptionServiceType = function(name){
			var description;
			servicesTypes.forEach(function(item){
				if (item.name === name) description = item.description;
			});
			return description;
		};

		/*
			obtener logo de proveedor
		*/
		vm.getProviderImage = function (name) {
			return ImageProviderFactory.getProviderImage(name);
		};


		vm.getAllTypes();
		vm.getAllServices();

	}

})();
