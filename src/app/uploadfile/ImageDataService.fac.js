(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('SaveImageDataService', SaveImageDataService);

		SaveImageDataService.$inject=[];
		function SaveImageDataService() {
			var _data = {},
				_uploadOk = {};

			var saveImageData = function(data) {
				_data = data;
				_uploadOk = true;
			}

			var getImageData = function () {
				return _data;
			}

			var removeImageData = function () {
				_data = {};
			}

			var isUploadedImage = function (){
				return _uploadOk;
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
				},
				isUploadedImage: function () {
					return isUploadedImage();
				}

			};
		}
})();