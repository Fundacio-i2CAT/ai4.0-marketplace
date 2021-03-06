(function () {
	'use strict';

	angular
		.module('marketplace')
		.directive('chunkdirective', chunkdirective);

		chunkdirective.$inject = ['ChunkUploader'];

		function chunkdirective (ChunkUploader) {
			var directive = {
				restrict: 'E',
				templateUrl: 'app/uploadfile/chunkUploader/chunk-uploader.tpl.html',
				link: function (scope) {

					ChunkUploader.chunk(scope);
				}
			};
			return directive;
		}
})();
