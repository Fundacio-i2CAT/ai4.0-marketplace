(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('PublishSrvController', PublishSrvController);
	PublishSrvController.$inject = [];

	function PublishSrvController() {
		var vm = this;
		vm.explanation = true;
		vm.types = [{name: 'int'}, {name: 'string'}, {name: 'file'}, {name: 'vdi'}];
		vm.allTemplates = [];
		vm.template = {};
		vm.srv = {};

		vm.createTemplate = function() {
			vm.explanation = false;
		};

		/*vm.json = [
  			vm.srv.title,
  			vm.plantilles,
  			vm.allFields
  		];*/

		vm.plantilles = [{id: 'plantilla1'}];
  		vm.allFields = [{id: 'field1'}];

		vm.addTemplate = function() {
			var newItemNo = vm.plantilles.length+1;
			vm.plantilles.push({'id':'plantilla'+newItemNo});
		};

		vm.removeTemplate = function() {
			if (vm.plantilles.length != 1) {
				var lastItem = vm.plantilles.length-1;
				vm.plantilles.splice(lastItem);
			}
		};

		vm.addField = function() {
			var fieldNum = vm.allFields.length+1;
			vm.allFields.push({'id':'fields'+fieldNum});
		};

		vm.removeField = function() {
			if (vm.allFields.length != 1) {
				var lastItem = vm.allFields.length-1;
				vm.allFields.splice(lastItem);
			}
		};



	}

})();

