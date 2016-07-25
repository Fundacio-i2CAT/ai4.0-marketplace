(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('ImageProviderFactory', ImageProviderFactory);

		ImageProviderFactory.$inject = [];

		function ImageProviderFactory() {
			
			var imageProvider = {};
			imageProvider.getProviderImage = getProviderImage;
			imageProvider.getServiceImage = getServiceImage;
			

			/*Logos de providers*/
			function getProviderImage(name) {
				var image = null;
				switch(name) {
					case 'Eurecat':
						image = 'logo_degradat_72.jpg';
					break;
					case 'Adam':
						image = 'Adam_72.jpg';
					break;
				}
				return image;
			}

			/*Imatges de Serveis*/
			function getServiceImage(name) {
				var image = null;
				switch(name) {
					case 'apache':
						image = 'apache.png';
						break;
					case 'cloud_service2':
					case 'cloud':
					case 'openstack':
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

			return imageProvider;
		}
})();