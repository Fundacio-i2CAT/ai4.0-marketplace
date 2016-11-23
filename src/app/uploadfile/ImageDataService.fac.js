(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('SaveImageDataService', SaveImageDataService);

		SaveImageDataService.$inject=[];
		function SaveImageDataService() {
			var _data = {};

			var saveImageData = function(data) {
				_data = data;
			}

			var getImageData = function () {
				return _data;
			}

			var removeImageData = function () {
				_data = {};
			}

			return {
				saveImageData: function(data) {
					return saveImageData(data);
				},
				getImageData: function() {
					return getImageData();
				},
				removeImageData: function () {
					return removeImageData();
				}

			};
		}
})();