(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('PublishSrvController', PublishSrvController);
	PublishSrvController.$inject = ['fileUpload', 'CatalogFactory', 'ConnectionFactory'];

	function PublishSrvController(fileUpload, CatalogFactory, ConnectionFactory) {
		var vm = this;
		var host = ConnectionFactory.host;
		vm.explanation = true;
		vm.types = [{name: 'Number'}, {name: 'String'}, {name: 'Url'}, {name: 'Vdi'}];
		vm.allTemplates = [];
		vm.template = {};
		vm.srv = {};


		vm.flavors = [
			{
				id: 1,
				name: 'id.tiny',
				memory: 512,
				disk: 1,
				cpus: 1
			},
			{
				id: 2,
				name: 'id.small',
				memory: 2048,
				disk: 20,
				cpus: 1
			},
			{
				id: 3,
				name: 'id.medium',
				memory: 4096,
				disk: 40,
				cpus: 2
			},
			{
				id: 4,
				name: 'id.large',
				memory: 8192,
				disk: 80,
				cpus: 4
			}
		];

		vm.createTemplate = function() {
			vm.explanation = false;
		};

		/* codigo para formulario estatico*/
		vm.launchTemplate = function(srv) {
			console.log(srv);
		};

		vm.uploadFile = function(){
	        var file = vm.myFile;
	        console.log('file is ', file);
	        var uploadUrl = host + "api/services/vmimage";
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	    };

	    vm.getAllTypes = function () {
			CatalogFactory.getAllTypes().then(function (response){
				if (response.status === 200) {
					vm.allTypes = response.data;
				}
			});		
		};

		vm.getAllTypes();








		/* codigo para formulario dinamico */
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

