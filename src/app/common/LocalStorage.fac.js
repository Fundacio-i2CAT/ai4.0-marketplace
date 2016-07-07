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
			function getValue(key) {
				return localStorageService.get(key); 
			}

			//set values
			function setValue(key, val) {
				return localStorageService.set(key, val);
			}

			//get storage type
			function getStorageType() {
				return localStorageService.getStorageType();
			}

			//get all storage keys
			function getKeys() {
				return localStorageService.keys();
			}

			//removeItem by key
			function removeItem(key) {
				return localStorageService.remove(key);
			}

			//removeListOfItems
			function removeListOfItems() {
				return localStorageService.remove(keysArray);
			}

			return factory;

		}
})();