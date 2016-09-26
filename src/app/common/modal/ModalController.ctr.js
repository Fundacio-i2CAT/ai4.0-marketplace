(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['item', 'ImageProviderFactory'];

	function ModalController(item, ImageProviderFactory) {
		var vm = this;

		vm.item = item;

		vm.getProviderImage = function (name) {
			return ImageProviderFactory.getProviderImage(name);
		}
	}

})();