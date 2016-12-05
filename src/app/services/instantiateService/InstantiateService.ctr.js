(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('InstantiateServiceController', InstantiateServiceController);

		InstantiateServiceController.$inject = ['ShareDataFactory', '$log', 'ngDialog', 'ServiceFactory'];
		function InstantiateServiceController(ShareDataFactory, $log, ngDialog, ServiceFactory) {
			var vm = this;
			vm.model = {}, vm.form = {}, vm.schema = {};
			var service = ShareDataFactory.getData();

			//build form
			if (angular.isArray(service.data)) {
				var allFields = getFieldsFromJson(service.data);
				vm.form = buildFormFromJson(allFields);
				vm.schema = buildSchemaFromJson(allFields);
			} else {
				vm.form = buildFormFromJson(service.data);
				vm.schema = buildSchemaFromJson(service.data);
			}

			function getFieldsFromJson (services) {
				var obj = {}, kk = [];
				angular.forEach(service.data, function(each, index){
					if (each.path) {
						obj[index] = each.path;	
					}
					
					angular.forEach(each.fields, function (field, index){
						kk.push(field);
					});
				});
				obj.fields = kk;

				return obj;
			}

			function buildFormFromJson(srv) {
				var listOfFields = [];
				angular.forEach(srv.fields, function(field, index){
					if (field.type == undefined) field.type = 'text';
					var form = {
						"key": field.name,
	    				"type": (field.type == 'integer') ? 'number' : field.type,
	    				"placeholder": field.name
					}
					listOfFields.push(form);
				});
				return listOfFields;
			}

			function buildSchemaFromJson(srv) {
				var tempSchema = {
					"type": "object",
					"title": "consumerParams",
					"properties": {},
					"required": []
				};
				angular.forEach(srv.fields, function(field, index){
					tempSchema.properties[field.name] = {
						"title": (field.required) ? field.name + ' *': field.name,
						"type": field.type,
						"description": field.desc
					}
					if (field.required) tempSchema.required.push(field.name);
				});
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

				angular.forEach(service.data, function (each, index){
					var temp = {
						path: each.path,
						fields: []
					};
					angular.forEach(each.fields, function (field, index){
						var field = {
							name: field.name,
							value: srvModel[field.name]
						};
						temp.fields.push(field);
					});
					serv.consumer_params.push(temp);
				});

				return serv;
			}

			vm.InstantiateSrv = function(srvModel) {
				var model = buildModelFromForm(srvModel, service);
				console.log(model);

			}









			/*vm.form = [
				"name",
				{
					"key": "email",
    				"type": "email",
    				"placeholder": "Correu electrònic"
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
			vm.schema = {
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
			};*/
		}
})();