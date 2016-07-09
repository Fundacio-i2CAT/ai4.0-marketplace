(function(){
	'use strict';
	angular
		.module('marketplace')
		.directive('idosnavbar', idosnavbar);

	idosnavbar.$inject = ['localStorageService', 'CurrentUserFactory'];
	
	/**
	* Directiva que proporciona el template del header de la aplicacion
	*/
	function idosnavbar(localStorageService, CurrentUserFactory){
		var directive = {
			restrict: 'E',
			templateUrl: 'app/main/navbar.tpl.html',
			controller: 'LoginController',
			controllerAs: 'logindirective',
			link: function (scope, element, attrs) {

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

				scope.isUserSession = function() {
					var user = localStorageService.get('user');
					if (user) {
						CurrentUserFactory.setLocalStorageCurrentUser(user);
						menuUser.user = user.user;
						menuUser.role = user.role;
						menuUser.isLogged = true;
						scope.menuUser = menuUser;
					}
				}
				

				scope.$on('userrole', function (event, data) {
					menuUser = data;
					if (menuUser.user && menuUser.role) {
						menuUser.isLogged = true;
						scope.menuUser = menuUser;
					} else {
						scope.menuUser = {};
					}
					
				});

				scope.logout = function () {
					scope.logindirective.doLogout(menuUser);
				};

				scope.isUserSession();
	
			}
		};
		return directive;
	}

})()