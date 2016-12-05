(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('InstantiateServiceController', InstantiateServiceController);

		InstantiateServiceController.$inject = ['ShareDataFactory', '$log', 'ngDialog'];
		function InstantiateServiceController(ShareDataFactory, $log, ngDialog) {
			var vm = this;
			vm.model = {}, vm.form = {}, vm.schema = {};
			var service = ShareDataFactory.getData();
			console.log(service.data);

			//build form
			if (angular.isArray(service.data)) {
				var obj = {}, kk = [];
				angular.forEach(service.data, function(each, index){
					angular.forEach(each.fields, function (field, index){
						kk.push(field);
					});
				obj.fields = kk;
				});
				console.log('obj:::', obj);
				vm.form = buildFormFromJson(obj);
				vm.schema = buildSchemaFromJson(obj);
			} else {
				vm.form = buildFormFromJson(service.data[0]);
				vm.schema = buildSchemaFromJson(service.data[0]);
			}

			function buildFormFromJson(srv) {
				var listOfFields = [];
				angular.forEach(srv.fields, function(field, index){
					if (field.type == undefined) field.type = 'text';
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

			vm.closeDialog = function() {
				vm.model = {};
				ngDialog.close({});
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