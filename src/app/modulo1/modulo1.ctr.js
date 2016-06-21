(function(){
	'use strict';
	
	angular
		.module('marketplace')
		.controller('Modulo1Controller', Modulo1Controller);

	Modulo1Controller.$inject = ['toastr'];
	function Modulo1Controller (toastr){
		var vm = this;

		vm.texto = "Index modulo1. Controller";
	
		function showToastr() {
			toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
		}

		vm.showToastr = showToastr;

	}

})(); 