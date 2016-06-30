(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ProjectsMock', ProjectsMock);

		ProjectsMock.$inject = [];

	function ProjectsMock(){
		var projects = [
			{
				"_id": "5770f22079374a13daa9838c",
				"status": 0, 
				"name": "project1", 
				"created_at": "2016-06-27 09:30:08.159000", 
				"updated_at": "2016-06-27 09:30:08.165000", 
				"summary": null, 
				"client": "5770f21e79374a13daa98388", 
				"services": [
					{
						"context_type": "system",
						"service_type": "system",  
						"status": 0, 
						"_id": "5770f22079374a13daa9838b", 
						"name": "apache", 
						"provider": {
							"_id": "5770f21e79374a13daa98386", 
							"name": "prov1"
						}
					}
				]
			},
			{
				"_id": "5770f22079374a13daa9838d",
				"status": 0, 
				"name": "project2", 
				"created_at": "2016-06-27 10:30:08.159000", 
				"updated_at": "2016-06-27 10:30:08.165000", 
				"summary": null, 
				"client": "5770f21e79374a13daa98388", 
				"services": [
					{
						"context_type": "system",
						"service_type": "system",  
						"status": 0, 
						"_id": "5770f22079374a13daa9838b", 
						"name": "apache", 
						"provider": {
							"_id": "5770f21e79374a13daa98386", 
							"name": "prov1"
						}
					}
				]
			},
			{
				"_id": "5770f22079374a13daa9838c",
				"status": 0, 
				"name": "project3", 
				"created_at": "2016-06-27 09:30:08.159000", 
				"updated_at": "2016-06-27 09:30:08.165000", 
				"summary": null, 
				"client": "5770f21e79374a13daa98388", 
				"services": [
					{
						"context_type": "system",
						"service_type": "system",  
						"status": 0, 
						"_id": "5770f22079374a13daa9838b", 
						"name": "apache", 
						"provider": {
							"_id": "5770f21e79374a13daa98386", 
							"name": "prov1"
						}
					}
				]
			},
			{
				"_id": "5770f22079374a13daa9838d",
				"status": 0, 
				"name": "project4", 
				"created_at": "2016-06-27 10:30:08.159000", 
				"updated_at": "2016-06-27 10:30:08.165000", 
				"summary": null, 
				"client": "5770f21e79374a13daa98388", 
				"services": [
					{
						"context_type": "system",
						"service_type": "system",  
						"status": 0, 
						"_id": "5770f22079374a13daa9838b", 
						"name": "apache", 
						"provider": {
							"_id": "5770f21e79374a13daa98386", 
							"name": "prov1"
						}
					}
				]
			}
		];

		return projects;
	}
})();