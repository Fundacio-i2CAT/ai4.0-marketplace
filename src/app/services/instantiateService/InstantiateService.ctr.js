(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('InstantiateServiceController', InstantiateServiceController);

		InstantiateServiceController.$inject = ['ShareDataFactory'];
		function InstantiateServiceController(ShareDataFactory) {
			var vm = this;
			var service = ShareDataFactory.getData();
			vm.service = service;
			vm.model={};
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

			//build form
			var srv = service.data[0];
			console.log('srv', srv);
			
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

			console.log('tempForm:::', tempForm)


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


			var tempForm = buildFormFromJson(srv);
			var tempSchema = buildSchemaFromJson(srv);
			vm.form = tempForm;
			vm.schema = tempSchema;

			console.log('tempForm:::', tempForm);
			console.log('tempSchema:::', tempSchema);
















		}
})();