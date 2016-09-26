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
					'PROJ-CLIENT':'PROJECTES',
					'FILTER-PLACEHOLDER-PROJ': 'Filtrar Projectes',
					'CREAR-PROJ': 'Nou Projecte',
					'PROJ-ARRENCAR': 'ARRENCAR',
					'PROJ-ATURAR': 'ATURAR',
					//estats
					'PENDENT': 'Pendent',
					'CONFIRMAT': 'Confirmat',
					'ACTIU': 'Actiu',
					'PARAT': 'Inactiu',
					'ACTIVAR': 'Confirmar',
					'DESACTIVAR': 'Desactivar',
					//new project
					'NEWPROJ': 'NOU PROJECTE',
					'LABEL-NOM': 'Nom',
					'LABEL-SUMARI': 'Sumari',
					'LABEL-DESC': 'Descripció',
					'LABEL-SERV': 'Serveis',
					'BTN-SAVE': 'Crear Projecte',
					'PLACEHOLDER-NAME': 'Nom projecte',
					'PLACEHOLDER-SUMARI': 'Resum descriptiu',
					'PLACEHOLDER-DESC': 'Descripció del projecte'

				})
				.preferredLanguage('CAT');
		}]);	

})();


