(function() {
	'use strict';

	angular
		.module('marketplace')
		.factory('ShareDataFactory', ShareDataFactory);

	ShareDataFactory.$inject = [];
	function ShareDataFactory() {
		var _data = {};

		var getData = function() {
			return _data;
		};

		var setData = function(newData) {
			_data = newData;
		};

		var cleanData = function () {
			_data = {};
		};

		return {
			getData: function (){
				return getData ();
			},
			setData: function (newData) {
				return setData(newData);
			},
			cleanData: function () {
				return cleanData();
			}
		}
	}
})();

