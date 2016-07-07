(function(){
	'use strict';

	angular
		.module('marketplace')
		.factory('LocalStorageFactory', LocalStorageFactory);

		LocalStorageFactory.$inject = ['localStorageService'];
		function LocalStorageFactory(localStorageService) {
			var factory = {};
			factory.setValue = setValue;
			factory.getValue = getValue;
			factory.getStorageType = getStorageType;
			factory.getKeys = getKeys;
			factory.removeItem = removeItem;
			factory.removeListOfItems = removeListOfItems;


			//get value from key. return string
			function getValue() {
				return function (key) {
					return localStorageService.set(key);
				} 
			}

			//set values
			function setValue() {
				return function (key, val) {
					return localStorageService.set(key, val);
				}
			}

			//get storage type
			function getStorageType() {
				return function() {
					return localStorageService.getStorageType();
				}
			}

			//get all storage keys
			function getKeys() {
				return function () {
					return localStorageService.keys();
				}
			}

			//removeItem by key
			function removeItem() {
				return function (key) {
					return localStorageService.remove(key);
				}
			}

			//removeListOfItems
			function removeListOfItems() {
				return function (keysArray) {
					return localStorageService.remove(keysArray);
				}
			}

			return factory;
		}
})();