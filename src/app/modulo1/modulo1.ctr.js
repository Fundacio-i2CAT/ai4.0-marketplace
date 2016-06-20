(function(){
	'use strinct';
	
	angular
		.module('marketplace')
		.controller('Modulo1Controller', Modulo1Controller);
	Modulo1Controller.$inject = [];
	function Modulo1Controller (){
		var vm = this;

		vm.texto = "Index modulo1. Controller";
	}

})(); 