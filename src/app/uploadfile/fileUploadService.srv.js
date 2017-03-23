(function() {
	'use strict';

	angular
		.module('marketplace')
		.service('fileUpload', fileUpload);
		fileUpload.$inject = ['$http', 'SaveImageDataService', 'toastr', '$rootScope', '$log'];
		function fileUpload($http, SaveImageDataService, toastr, $rootScope, $log) {
			this.uploadFileToUrl = function(file, uploadUrl){
				var fd = new FormData();
				fd.append('file', file);
				$http.post(uploadUrl, fd, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined}
				})
				.success(function(response){
					$rootScope.$broadcast('uploadOk', response);
					SaveImageDataService.saveImageData(response);
					toastr.success('Imatge de disc carregada amb èxit','Càrrega Imatge Disc');
				})
				.error(function(error){
					$log.log(error);
					toastr.error('Hi ha hagut un error i no s\'ha pogut pujar la Imatge','Càrrega Imatge Disc');
				});
			}
		}
})();
