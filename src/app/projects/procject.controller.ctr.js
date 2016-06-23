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
			toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
		}

		vm.showToastr = showToastr;

	}

})(); 