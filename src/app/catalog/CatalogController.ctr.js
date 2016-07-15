(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('CatalogController', CatalogController);
	CatalogController.$inject = ['CatalogFactory', '$location', 'ProgressFactory'];
	function CatalogController(CatalogFactory, $location, ProgressFactory) {
		var vm = this;

		vm.getAllTypes = function () {
			CatalogFactory.getAllTypes().then(function (response){
				if (response.status === 200) {
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
			var services = [],
				genericServices = [];
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
			Devuelve una imagen u otra según el tipo de servicio (actualmente se mira por el nombre)
		*/
		vm.getImage = function (name) {
			var image = null;
			switch(name) {
				case 'apache':
					image = 'apache.png';
					break;
				case 'cloud_service2':
					image = 'cloud-services2.jpg';
					break;
				case 'service1':
					image = 'services01.jpg';
					break;
				default:
					image = 'services01.jpg';
					break;
			}
			return image;
		}

		vm.getAllTypes();
		vm.getAllServices();
		
	}

})();