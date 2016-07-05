(function() {
	'use strict';

	angular
		.module('marketplace')
		.factory('ProviderProjectsMockFactory', ProviderProjectsMockFactory);

		ProviderProjectsMockFactory.$inject = [];
		function ProviderProjectsMockFactory() {
			var providerProjects = [
				{
					"status": 1, 
					"service": {
						"_id": "577b8f2079374a0dd556cd1b", 
						"name": "apache"
					}, 
					"context_type": "ssh", 
					"project": {
						"_id": "577b8f2079374a0dd556cd1f", 
						"name": "project1"
					}, 
					"client": {
						"_id": "577b8f2079374a0dd556cd16", 
						"name": "prov1"
					}, 
					"_id": "577b8f2079374a0dd556cd20"
				}, 
				{
					"status": 1, 
					"service": {
						"_id": "577b8f2079374a0dd556cd1e", 
						"name": "cloud_service2"
					}, 
					"context_type": "cloud", 
					"project": {
						"_id": "577b8f2079374a0dd556cd21", 
						"name": "project2"
					}, 
					"client": {
						"_id": "577b8f2079374a0dd556cd16", 
						"name": "prov1"
					}, 
					"_id": "577b8f2079374a0dd556cd23"
				}
			];

			return providerProjects;
		}
})();