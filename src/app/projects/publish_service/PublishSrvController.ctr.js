(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('PublishSrvController', PublishSrvController);
	PublishSrvController.$inject = ['$scope', 'fileUpload', 'CatalogFactory', 'ServiceFactory', 'ConnectionFactory', 'LocalStorageFactory', 'SaveImageDataService', 'ngDialog'];

	function PublishSrvController($scope, fileUpload, CatalogFactory, ServiceFactory, ConnectionFactory, LocalStorageFactory, SaveImageDataService, ngDialog) {
		var vm = this;
		var host = ConnectionFactory.host;
		vm.types = [{name: 'Number'}, {name: 'String'}, {name: 'Url'}, {name: 'Vdi'}];
		vm.allTemplates = [];
		vm.template = {};
		vm.srv = {};
		vm.isLoadedImage = false;
		vm.showbar = false;


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

		$scope.$on('uploadOk', function (event, data) {
			console.log(data);
			vm.showbar = false;
	        vm.isLoadedImage = SaveImageDataService.isUploadedImage();
		});

		vm.createTemplate = function() {
			vm.explanation = false;
		};

		/* codigo para formulario estatico*/
		vm.launchTemplate = function(srv) {
			var provider = getCurrentProvider('user');
			var imageData = SaveImageDataService.getImageData();
			
			var srvToSave = {
				name: srv.title,
				description: srv.description,
				summary: srv.summary,
				service_type: srv.type.name,
				provider: provider.user.provider_id,
				consumer_params: [
					{
						path: srv.path,
						fields: [
							{
								name: srv.field1.name,
								required: srv.field1.required,
								desc: srv.field1.desc
							},
							{
								name: srv.field2.name,
								required: srv.field2.required,
								desc: srv.field2.desc
							},
							{
								name: (srv.field3.name) ? srv.field3.name : '',
								required: (srv.field3.required) ? srv.field3.required : '',
								desc: (srv.field3.desc) ? srv.field3.desc : '' 
							}
						]
					}
				],
				flavor: srv.flavor.name,
				name_image: imageData.name_image,
				vm_image: imageData.vm_image,
				vm_image_format: imageData.vm_image_format,
				runtime_params: [
					{
						name: srv.field1.name,
						required: srv.field1.required,
						desc: srv.field1.desc
					}
				]
			};
			ServiceFactory.createService(srvToSave).then(function (response){
				console.log(response);
			}, function (error) {
				console.log(error);
			});
		};

		function buildJson() {}

		function getCurrentProvider(key) {
			return LocalStorageFactory.getValue(key);
		}

		vm.uploadFile = function(){
	        var file = vm.myFile;
	        console.log('file is ', file);
	        var uploadUrl = host + "api/services/vmimage";
	        // fileUpload.uploadFileToUrl(file, uploadUrl);
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	        vm.showbar = true;
	    };

	    vm.getAllTypes = function () {
			CatalogFactory.getAllTypes().then(function (response){
				if (response.status === 200) {
					vm.allTypes = response.data;
				}
			});		
		};

		vm.getAllTypes();




		/* ngDialog Explanation modal */
		vm.showExplanationModal = function() {
			ngDialog.open({
        		template: 'app/projects/publish_service/explanationModal/explanation-modal.tpl.html',
        		className: 'ngdialog-theme-default',
        		controller: 'PublishSrvController',
        		controllerAs: 'publishsrv',
        		appendClassName: 'ngdialog-publish'
        	});
		};
		


		
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

