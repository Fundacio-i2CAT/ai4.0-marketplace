(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.directive('showServices', showServices);

	showServices.$inject = ['$uibModal'];

	function showServices($uibModal){
		var directive ={
			restrict: 'A',
			scope: false,
			link: function (scope, element) {
				element.on('click', function(){
					$uibModal.open({
						animation: true,
						controller: 'ModalController',
						controllerAs: 'srvmodal',
						templateUrl: 'app/common/modal/modal.tpl.html',
						backdropClass: 'modal-position',
						resolve: {
							item: function () {
								return scope.srv;
							}
						}
					});
				});

			}
		};

		return directive;
	}

})();