(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('PublishSrvController', PublishSrvController);
	PublishSrvController.$inject = [];

	function PublishSrvController() {
		var vm = this;
		vm.explanation = true;
		vm.template = false;
		vm.types = ['int', 'string', 'file'];
		vm.allTemplates = [
		];
		vm.template = {};

		vm.createTemplate = function() {
			vm.explanation = false;
			vm.template = true;
		};






		vm.plantilles = [{id: 'plantilla1'}];
  		vm.allFields = [{id: 'field1'}];

		  vm.addNewChoice = function() {
		    var newItemNo = vm.plantilles.length+1;
		    vm.plantilles.push({'id':'plantilla'+newItemNo});
		  };
		    
		  vm.removeChoice = function() {
		    var lastItem = vm.plantilles.length-1;
		    vm.plantilles.splice(lastItem);
		  };



	}

})();

