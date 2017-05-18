(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('PublishSrvController', PublishSrvController);
	PublishSrvController.$inject = ['$timeout', '$scope', '$state', 'toastr', 'fileUpload', 'CatalogFactory', 'ServiceFactory', 'ConnectionFactory', 'LocalStorageFactory', 'SaveImageDataService', 'ngDialog', 'InfrastructureFactory', '$log', '$base64'];

	function PublishSrvController($timeout, $scope, $state, toastr, fileUpload, CatalogFactory, ServiceFactory, ConnectionFactory, LocalStorageFactory, SaveImageDataService, ngDialog, InfrastructureFactory, $log, $base64) {
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
			srv.customerParams = vm.templates;
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
				consumer_params: [],
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
			if (srv.customerParams) {
				var templatesList = [];
				angular.forEach(srv.customerParams, function (template){
					$log.log(template);
					var fieldsList = [];
					angular.forEach(template.choices, function (choice){
						var field = {
							name: choice.name,
							type: choice.type.name,
							required: choice.required,
							desc: choice.description
						};
						fieldsList.push(field);
					});
					var plantilla = {
						path: template.path,
						fields: fieldsList
					};
					templatesList.push(plantilla);
				});
				srvToSave.consumer_params = templatesList;
			}

			srvToSave.service_icon = vm.coded;
			// $log.log(srvToSave);
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

		vm.closeDialog = function() {
				ngDialog.close();
		};



		//DYNAMIC FORM TAMPLATES
		vm.templates = [];
		vm.showLabels = false;

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
			vm.showLabels = true;
			var newItemNo = currentTemplate.choices.length+1;
			currentTemplate.choices.push({'id':'field'+newItemNo});
			if (currentTemplate.choices.length === 0) vm.showLabels = false;
		};

		vm.removeParam = function(currentTemplate) {
			var lastItem = currentTemplate.choices.length-1;
			currentTemplate.choices.splice(lastItem);
		};

		var getBase64 = function(file) {
			 var reader = new FileReader();
			 reader.readAsDataURL(file);
			 reader.onload = function () {
				 vm.coded = reader.result;
				 console.log('vm.coded', vm.coded);
			 };
			 reader.onerror = function (error) {
				 console.log('onError::: ', error);
			 };
		};

		$scope.uploadLogo = function () {
			$timeout(function () {
				var file = vm.myFile;
				getBase64(vm.myFile);
			}, 3000);

		};

	}

})();
