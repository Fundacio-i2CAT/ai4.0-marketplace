(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('ProgressFactory', ProgressFactory);

	ProgressFactory.$inject = ['ngProgressFactory'];
	function ProgressFactory (ngProgressFactory) {
		var factory = {};
		factory.progressBarConfigure = progressBarConfigure;

		function progressBarConfigure (){
			var progressbar = ngProgressFactory.createInstance();
			progressbar.setHeight('2px');
			progressbar.setColor('#ff8000'); //orange
			// progressbar.setColor('#ff1ab3'); //pink

			return progressbar;
		}

		return factory;
	}

})();