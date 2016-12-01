(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('InstantiateServiceController', InstantiateServiceController);

		InstantiateServiceController.$inject = ['ShareDataFactory'];
		function InstantiateServiceController(ShareDataFactory) {
			var vm = this;
			vm.service = service;
			vm.model={};
			var service = ShareDataFactory.getData();

			//build form
			if (angular.isArray(service.data[0])) {
				alert('es un array');
			} else {
				vm.form = buildFormFromJson(service.data[0]);
				vm.schema = buildSchemaFromJson(service.data[0]);
			}

			function buildFormFromJson(srv) {
				var listOfFields = [];
				angular.forEach(srv.fields, function(field, index){
					var form = {
						"key": field.name,
	    				"type": (field.type == 'integer') ? 'number' : field.type,
	    				"placeholder": field.desc
					}
					listOfFields.push(form);
				});

				return listOfFields;
			}

			function buildSchemaFromJson(srv) {

				var tempSchema = {
					"type": "object",
					"title": "consumerParams",
					"properties": {}
				};

				angular.forEach(srv.fields, function(field, index){
					tempSchema.properties[field.name] = {
						"title": field.name,
						"type": field.type
					}

				});

				return tempSchema;
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