(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('ProjectController', ProjectController);

	ProjectController.$inject = ['toastr'];
	function ProjectController (toastr){
		var vm = this;

		vm.texto = "Index projects. Controller";

		function showToastr() {
			
			// toastr.info('Info');
			toastr.success('Info');
			// toastr.warning('Info');
			// toastr.error('Info');
		}

		vm.showToastr = showToastr;

	}

})(); 