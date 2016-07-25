(function(){
	'use strict';

	angular
		.module('marketplace')
		.config(['$translateProvider', function($translateProvider){
			$translateProvider
				.translations('CAST', {
					//navbar
					'CATALEG-NAV': 'Catálogo',
					'PROJECTES-NAV': 'Proyectos',
					'SERVEIS-NAV': 'Servicios',
					'ACCEDIR-NAV': 'Acceder',
					'SORTIR-NAV': 'Salir',
					//catalog
					'CATAL-TITOL': 'CATÁLOGO',
					'CATAL-PROVEIDOR': 'Proveedor',
					'CATAL-TOTS': 'Todos',
					//serveis
					'SERV-TITOL': 'Servicios',
					'FILTER-PLACEHOLDER': 'Filtrar Servicios',
					'SRV-CLIENT':'Cliente',
					'SRV-ESTAT':'Estado',
					'SRV-SOLICITUD':'Solicitud',
					'SRV-PROJECTE':'Proyecto',
					'SRV-CREACIO':'Creación',
					'SRV-ACCIONS':'Acciones',
					//projectes
					'PROJ-CLIENT':'Proyectos',
					'FILTER-PLACEHOLDER-PROJ': 'Filtrar Proyectos',
					'CREAR-PROJ': 'Crear Proyecto'
				});
		}]);

})();
				