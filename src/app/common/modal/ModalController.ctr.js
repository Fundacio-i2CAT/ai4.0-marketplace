(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$scope', 'item'];

	function ModalController($scope, item) {

		$scope.item = item;

		$scope.getProviderImage = function (name) {
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


		/*$scope.ok = function (){
			$close();
		}

		$scope.cancel = function (){
			$uibModal.close('cancel');
		}*/
	}

})();