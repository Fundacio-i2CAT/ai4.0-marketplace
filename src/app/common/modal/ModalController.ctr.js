(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$scope', 'item', 'ImageProviderFactory'];

	function ModalController($scope, item, ImageProviderFactory) {

		$scope.item = item;

		$scope.getProviderImage = function (name) {
			return ImageProviderFactory.getProviderImage(name);
		}
	}

})();