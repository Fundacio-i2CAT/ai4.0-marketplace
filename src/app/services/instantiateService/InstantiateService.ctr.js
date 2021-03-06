(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('InstantiateServiceController', InstantiateServiceController);

		InstantiateServiceController.$inject = ['$rootScope', 'ShareDataFactory', '$log', 'ngDialog', 'ServiceFactory', '$interval', 'usSpinnerService', 'ProjectFactory', '$state', 'toastr'];
		function InstantiateServiceController($rootScope, ShareDataFactory, $log, ngDialog, ServiceFactory, $interval, usSpinnerService, ProjectFactory, $state, toastr) {
			var vm = this;
			vm.model = {}, vm.form = {}, vm.schema = {};
			var service = ShareDataFactory.getData();
			vm.service = service;

			vm.hideInstantiateButton = function (srv) {
				$rootScope.$broadcast('hideButton', srv.srv);
			}

			//build form
			/*if (angular.isArray(service.data)) {
				var allFields = getFieldsFromJson(service.data);
				vm.form = buildFormFromJson(allFields);
				vm.schema = buildSchemaFromJson(allFields);
			} else {
				vm.form = buildFormFromJson(service.data);
				vm.schema = buildSchemaFromJson(service.data);
			}*/

			var allFields = getFieldsFromJson(service.json.data);
			vm.form = buildFormFromJson(allFields);
			vm.schema = buildSchemaFromJson(allFields);


			function getFieldsFromJson (services) {
				var obj = {}, kk = [];
				angular.forEach(services, function(each){
					if (each.path) {
						obj.path = each.path;
					}

					angular.forEach(each.fields, function (field){
						kk.push(field);
					});
				});
				obj.fields = kk;

				return obj;
			}

			function buildFormFromJson(srv) {
				var listOfFields = [];
				angular.forEach(srv.fields, function(field){
					if (field.type == undefined) field.type = 'String';
					var form = {
						key: field.name,
						type: (field.type == 'integer') ? 'number' : field.type,
						placeholder: field.desc
					}
					listOfFields.push(form);
				});
				$log.log('buildFormFromJson', listOfFields);
				return listOfFields;
			}

			function buildSchemaFromJson(srv) {
				var tempSchema = {
					"type": "object",
					"title": "consumerParams",
					"properties": {},
					"required": []
				};
				angular.forEach(srv.fields, function(field){
					tempSchema.properties[field.name] = {
						"title": (field.required) ? field.name + ' *' : field.name,
						"type": field.type,
						"description": field.desc
					}
					if (field.required) tempSchema.required.push(field.name);
				});
				$log.log('buildSchemaFromJson',tempSchema);
				return tempSchema;
			}

			vm.closeDialog = function() {
				vm.model = {};
				ngDialog.close({});
			}

			function buildModelFromForm (srvModel, service) {
				var serv = {
					status: 5,
					consumer_params: []
				};

				angular.forEach(service.data, function (each){
					var temp = {
						path: each.path,
						fields: []
					};
					angular.forEach(each.fields, function (field){
						var _field = {
							name: field.name,
							value: srvModel[field.name]
						};
						temp.fields.push(_field);
					});
					serv.consumer_params.push(temp);
				});

				return serv;
			}

			vm.InstantiateSrv = function(srvModel) {
				var model = buildModelFromForm(srvModel, service.json);
				var projId = service.project_id;
				vm.startSpin();
				ServiceFactory.instantiateSrvConsumerParams(model, projId).then(function(response) {
					$log.log('instantiateSrvConsumerParams:::', response);

					if (response.status === 200) {
						var internalPromise = $interval(function(){
							ProjectFactory.getProjectState(projId).then(function(response){
								$log.log('getprojectState::::', response);
								if (response.data.status == 'fail') {
									toastr.error('No s\'ha pogut instanciar el projecte perque s\'ha produ??t un error', 'Error al Instanciar Projecte');
									return;
								}

								if (response.data.status === 5) {
									$interval.cancel(internalPromise);
									toastr.success('El Projecte s\'ha instanciat correctament', 'Instanciar Projecte');
									close();
								} else if (response.data.status === 7) {
									$interval.cancel(internalPromise);
									toastr.error('No s\'ha pogut instanciar el projecte perque s\'ha produ??t un error', 'Error al Instanciar Projecte');
									close();
								}
							});
						}, 30000);
					}
				});

			};

			function close() {
				vm.stopSpin();
				vm.closeDialog();
				$state.reload();
			}

			vm.startSpin = function() {
				usSpinnerService.spin('spinner-33');
			};

			vm.stopSpin = function() {
				usSpinnerService.stop('spinner-33');
			};







			vm.form2 = [
				"name",
				{
					"key": "email",
					"type": "email",
					"placeholder": "Correu electr??nic"
				},
				{
					"key": "comment",
					"type": "textarea",
					"placeholder": "Make a comment"
				},
				{
					"type": "submit",
				"style": "btn-info btn-block",
					"title": "Enviar dades"
				}
			];
			vm.schema2 = {
				"type": "object",
				"title": "consumerParams",
				"properties": {
					"name": {
						"title": "Name",
						"type": "string"
					},
					"email": {
						"title": "Email",
						"type": "string",
						"pattern": "^\\S+@\\S+$",
						"description": "Email will be used for evil."
					},
					"comment": {
						"title": "Comment",
						"type": "string",
						"maxLength": 20,
						"validationMessage": "Don't be greedy!"
					}
				},
				"required": [
				"name",
				"email",
				"comment"
				]
			};
		}
})();
