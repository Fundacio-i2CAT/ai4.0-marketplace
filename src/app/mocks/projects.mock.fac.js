(function (){
	'use strict';

	angular
		.module('marketplace')
		.factory('ProjectsMock', ProjecstMock);

		ProjecstMock.$inject = [];

	function ProjecstMock(){
		var projects = [
			{

			},
			{

			}
		];

		return projects;
	}
})();