(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('ModalController', ModalController);

	ModalController.$inject = ['$modalInstance', 'item', '$modal'];

	function ModalController($modalInstance, item, $modal) {
		/*var vm = this;

		vm.srv = item;

		vm.ok = function (){
			alert('ok');
		}

		vm.cancel = function (){
			alert('cancel');
		}*/
	}

})();