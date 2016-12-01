(function(){
	'use strict';

	angular
		.module('marketplace')
		.controller('InstantiateServiceController', InstantiateServiceController);

		InstantiateServiceController.$inject = ['ShareDataFactory'];
		function InstantiateServiceController(ShareDataFactory) {
			var vm = this;
			var service = ShareDataFactory.getData();
			// vm.service = service;
			vm.txt = "Hi InstantiateServiceController";

			vm.form = [
				"name",
				"email",
				{
					"key": "comment",
    				"type": "textarea",
    				"placeholder": "Make a comment"
				},
				{
					"type": "submit",
    				"style": "btn-info",
					"title": "OK"
				}
			];

			vm.schema = {
				"type": "object",
				"title": "Comment",
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