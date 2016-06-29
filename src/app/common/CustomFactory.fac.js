(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('CustomFactory', CustomFactory);

		CustomFactory.$inject = [];

		function CustomFactory () {

			var customFactory = {};
			customFactory.formatDate = formatDate;
			customFactory.isEmptyObject = isEmptyObject;

			
			//Convert timestamp date to 'spanish' format date '21/11/2016'
			function formatDate(date) {
				return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
			}

			//check if an object is empty of properties or not
			function isEmptyObject(obj) {
				for (var prop in obj) {
					if(obj.hasOwnProperty(prop)) return false; 
				}
				return true;
			}




			return customFactory;
		}
})();
