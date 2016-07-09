(function(){
	'use strict';
	angular
		.module('marketplace')
		.directive('idosnavbar', idosnavbar);

	idosnavbar.$inject = ['LocalStorageFactory'];
	
	/**
	* Directiva que proporciona el template del header de la aplicacion
	*/
	function idosnavbar(LocalStorageFactory){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/main/navbar.tpl.html',
			controller: 'LoginController',
			controllerAs: 'logindirective',
			scope: false,
			link: function (scope, element, attrs, ctr) {

				/*
					Tancar collapsed menu despres de clicar un menu item
				*/
				angular.element('a.toclose').on('click', function (){
					var but = angular.element('#bs-example-navbar-collapse-1');
					but.collapse('hide');
				});

				var menuUser = {
					isLogged : null	
				};

				menuUser.user = LocalStorageFactory.getValue('user');

				scope.$on('userrole', function (event, data) {
				    console.log(data); // 'Some data'
				 });

				if (menuUser.user) {
					menuUser.isLogged = true;
				}

				scope.menuUser = menuUser;
			}
		};
		return directive;
	}

})()