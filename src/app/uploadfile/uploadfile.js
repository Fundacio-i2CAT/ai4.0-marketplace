(function() {
	'use strict';

	/*angular
		.module('marketplace')
		.controller('UploadFileController', UploadFileController);

	UploadFileController.$inject = ['fileUpload'];
	function UploadFileController(fileUpload) {
		var vm = this;

		 vm.uploadFile = function(){
	        var file = vm.myFile;
	        console.log('file is ' );
	        console.dir(file);
	        var uploadUrl = "/fileUpload";
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	    };
	}*/

	angular
		.module('marketplace')
		.service('fileUpload', fileUpload);
		fileUpload.$inject = ['$http'];
		function fileUpload($http) {
			this.uploadFileToUrl = function(file, uploadUrl){
		        var fd = new FormData();
		        fd.append('file', file);
		        $http.post(uploadUrl, fd, {
		            transformRequest: angular.identity,
		            headers: {'Content-Type': undefined}
		        })
		        .success(function(response){
	        		console.log(response);
		        })
		        .error(function(error){
		        	console.log(error);
		        });
		    }

		}

	angular
		.module('marketplace')
		.directive('fileModel', ['$parse', function ($parse) {
		    return {
		        restrict: 'A',
		        link: function(scope, element, attrs) {
		            var model = $parse(attrs.fileModel);
		            var modelSetter = model.assign;
		            
		            element.bind('change', function(){
		                scope.$apply(function(){
		                    modelSetter(scope, element[0].files[0]);
		                });
		            });
		        }
		    };
		}]);	


})();