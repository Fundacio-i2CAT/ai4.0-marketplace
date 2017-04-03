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
			imageProvider.getCatalogServiceLogo = getCatalogServiceLogo;


			/*Logos de providers*/
			function getProviderImage(name) {
				var image = null;
				switch(name) {
					case 'Eurecat':
						image = 'logo_degradat_72.jpg';
					break;
					case 'Adam':
					default:
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



			/*Logos dels proveïdors al cataleg*/
			function getCatalogServiceLogo (provider) {
				var image = null;

				switch (provider) {
					case 'IoT Starter Kit':
						image = 'uoci2cat.png';
					break;
					case 'Node-RED':
						image = 'node-red-icon.png';
					break;
					case 'Ubuntu Zesty Zapus a Adam':
						image = 'ubuntu.png';
					break;
					case 'Plastic Injection Molding Monitoring':
						image = 'logo_degradat_72.jpg';
					break;
					case 'iThinkUPC':
						image = 'itk-big-crop.png';
					break;
				}

				return image;ç

			}



			return imageProvider;
		}
})();
