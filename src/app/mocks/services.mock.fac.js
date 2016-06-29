(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('ServicesMock', ServicesMock);

		ServicesMock.$inject = [];
	function ServicesMock(){
		var services = [
			{
				"name": "service1", 
				"sectors": [
					"industry",
					"technology"
				], 
				"created_at": "2016-06-10T14:11:36.379000", 
				"updated_at": null, 
				"summary": "summary 1", 
				"provider": "575aca9876e63a3a870ee462", 
				"service_type": "generic", 
				"_id": "575aca9876e63a3a870ee465"
			}, 
			{
				"name": "cloud_service2", 
				"sectors": [
					"cities"
				], 
				"created_at": "2016-06-10T14:11:36.390000", 
				"updated_at": null, 
				"summary": "summary 2", 
				"provider": "575aca9876e63a3a870ee462", 
				"service_type": "cloud", 
				"_id": "575aca9876e63a3a870ee466"
			},
			{
				"name": "service3", 
				"sectors": [
					"industry",
					"application",
					"web technology"
				], 
				"created_at": "2016-06-10T14:11:36.379000", 
				"updated_at": null, 
				"summary": "summary 3", 
				"provider": "575aca9876e63a3a870ee462", 
				"service_type": "generic", 
				"_id": "575aca9876e63a3a870ee465"
			}, 
			{
				"name": "service4", 
				"sectors": [
					"automotion"
				], 
				"created_at": "2016-06-10T14:11:36.390000", 
				"updated_at": null, 
				"summary": "summary 4", 
				"provider": "575aca9876e63a3a870ee462", 
				"service_type": "cloud", 
				"_id": "575aca9876e63a3a870ee466"
			}

		];

		return services;
	}



})();