(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('CAT', {
					//navbar
					'CATALEG-NAV': 'Catàleg',
					'PROJECTES-NAV': 'Projectes',
					'SERVEIS-NAV': 'Serveis',
					'ACCEDIR-NAV': 'Accedir',
					'SORTIR-NAV': 'Sortir',
					//catalog
					'CATAL-TITOL': 'CATÀLEG',
					'CATAL-PROVEIDOR': 'Proveïdor',
					'CATAL-TOTS': 'Tots',
					//serveis
					'SERV-TITOL': 'Serveis',
					'FILTER-PLACEHOLDER': 'Filtrar Serveis',
					'SRV-CLIENT':'Client',
					'SRV-ESTAT':'Estat',
					'SRV-SOLICITUD':'Sol·licitud',
					'SRV-PROJECTE':'Projecte',
					'SRV-CREACIO':'Creació',
					'SRV-ACCIONS':'Accions',
					//projectes
					'PROJ-CLIENT':'Projectes',
					'FILTER-PLACEHOLDER-PROJ': 'Filtrar Projectes',
					'CREAR-PROJ': 'Crear Projecte'


				})
				.preferredLanguage('CAT');
		}]);	

})();


