(function(){
	'use strinct';
	
	angular
		.module('marketplace')
		.controller('Modulo1Controller', Modulo1Controller);
	Modulo1Controller.$inject = ['$scope'];
	function Modulo1Controller ($scope){
		var vm = this;

		vm.texto = "Index modulo1. Controller";
	}

})(); 