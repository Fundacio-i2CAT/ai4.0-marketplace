(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('PublishSrvController', PublishSrvController);
	PublishSrvController.$inject = ['$scope', '$state', 'toastr', 'fileUpload', 'CatalogFactory', 'ServiceFactory', 'ConnectionFactory', 'LocalStorageFactory', 'SaveImageDataService', 'ngDialog', 'InfrastructureFactory', '$log'];

	function PublishSrvController($scope, $state, toastr, fileUpload, CatalogFactory, ServiceFactory, ConnectionFactory, LocalStorageFactory, SaveImageDataService, ngDialog, InfrastructureFactory, $log) {
		var vm = this;
		var host = ConnectionFactory.host;
		vm.allTemplates = [];
		vm.template = {};
		vm.srv = {};
		vm.isLoadedImage = false;
		vm.showbar = false;
		vm.selectedRowId = null;
		vm.iaasSelected = null;
		vm.hideButtons = false;

		vm.types = [{name: 'Number'}, {name: 'String'}];
		vm.discImageFormat = [{name: 'QCOW2'}, {name: 'VDI'}];

		//get the allowed infrastructure service providers (i2dat / adam)
		vm.getInfrastructureProvider = function() {
			InfrastructureFactory.getInfrastructureProvider().then(function (response){
				vm.iaasProvider = response;
			}, function(error){
				$log.log(error);
			});
		};

		function getFlavorsFromPop(pop_id) {
			InfrastructureFactory.getFlavorsFromPop(pop_id).then(function(response){
				$log.log(response);
				vm.flavors = response.flavors;
			}, function(error){
				$log.log(error);
			});
		}

		vm.getInfrastructureProvider();

		//get flavors when a infrastructure provider is selected
		vm.setIaasProvider = function(iaas) {
			getFlavorsFromPop(iaas.pop_id);
			vm.iaasSelected = true;
		};

		$scope.$on('uploadOk', function (event, data) {
			$log.log(data);
			vm.showbar = false;
			vm.isLoadedImage = SaveImageDataService.isUploadedImage();
		});

		vm.createTemplate = function() {
			vm.explanation = false;
		};

		/* codigo para formulario estatico*/
		vm.launchTemplate = function(srv) {
			var model = buildPublishServiceJSON(srv);
			ServiceFactory.createService(model).then(function (response){
				$log.log(response);
				toastr.success('Servei publicat correctament', 'Publicació de Servei');
				ngDialog.close();
				$state.go('catalog');
			}, function (error) {
				$log.log(error);
				toastr.error('No s\'ha pogut publicar el Servei', 'Error al publicar el Servei');
				ngDialog.close();
				$state.go('provprojects');
			});
		};

		function buildPublishServiceJSON (srv) {
			var provider = getCurrentProvider('user');
			var imageData = SaveImageDataService.getImageData();

			var srvToSave = {
				name: srv.title,
				description: srv.description,
				summary: srv.summary,
				service_type: srv.type.name,
				provider: provider.user.provider_id,
				price_initial: srv.price.initial,
				price_x_hour: srv.price.perhour,
				consumer_params: [
					{
						path: srv.path,
						fields: []
					}
				],
				flavor: srv.flavor.name,
				pop_id: srv.iaas.pop_id,
				name_image: imageData.name_image,
				vm_image: imageData.vm_image,
				vm_image_format: (srv.diskImageType.name == undefined || srv.diskImageType.name == null) ? 'qcow2' : srv.diskImageType.name,
				runtime_params: [
					{
						name: srv.rtime.name,
						type: srv.rtime.type.name,
						required: srv.rtime.required,
						desc: srv.rtime.desc
					}
				]
			};

			//obtenir els templates dinamicament
			if (srv.fields) {
				var listOfFields = [];
				angular.forEach(srv.fields, function (field){
					var fieldOK = {
						name: field.name,
						type: field.type.name,
						required: field.required,
						desc: field.type.name
					};
					listOfFields.push(fieldOK);
				});
				srvToSave.consumer_params[0].fields = listOfFields;
			}
			$log.log(srvToSave);
			return srvToSave;
		}

		function getCurrentProvider(key) {
			return LocalStorageFactory.getValue(key);
		}

		vm.uploadFile = function(){
			var file = vm.myFile;
			$log.log('file is ', file);
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

		vm.selectFlavor = function(flavor) {
			$log.log(flavor);
		};

		vm.selectedRow = function(id) {
			vm.selectedRowId = id;
		};

		/* codigo para formulario dinamico */
		// vm.plantilles = [{id: 'plantilla1'}];
		// vm.allFields = [{id: 'field1'}];
		// vm.addTemplate = function() {
		// 	var newItemNo = vm.plantilles.length+1;
		// 	vm.plantilles.push({'id':'plantilla'+newItemNo});
		// };
		// vm.removeTemplate = function() {
		// 	if (vm.plantilles.length != 1) {
		// 		var lastItem = vm.plantilles.length-1;
		// 		vm.plantilles.splice(lastItem);
		// 	}
		// };
		// vm.addField = function() {
		// 	var fieldNum = vm.allFields.length+1;
		// 	vm.allFields.push({'id':'fields'+fieldNum});
		// };
		// vm.removeField = function() {
		// 	if (vm.allFields.length != 1) {
		// 		var lastItem = vm.allFields.length-1;
		// 		vm.allFields.splice(lastItem);
		// 	}
		// };

		vm.closeDialog = function() {
				ngDialog.close();
		};



		//DYNAMIC FORM TAMPLATES
		vm.templates = [];

		vm.addNewTemplate = function() {
			var newTemplateNo = vm.templates.length + 1;
			vm.templates.push({
				'id': newTemplateNo,
				'choices': []
			});
		};

		vm.removeTemplate = function() {
			var lastTemplate = vm.templates.length - 1;
			vm.templates.splice(lastTemplate);
		};

		//DYNAMIC FORM FIELDS
		vm.choices = [];

	  vm.addNewParam = function(currentTemplate) {
			var newItemNo = currentTemplate.choices.length+1;
			currentTemplate.choices.push({'id':'field'+newItemNo});

	    // var newItemNo = vm.choices.length+1;
	    // vm.choices.push({'id':'field'+newItemNo});
	  };

	  vm.removeParam = function(currentTemplate) {
	    var lastItem = currentTemplate.choices.length-1;
	    currentTemplate.choices.splice(lastItem);
	  };



	}

})();
