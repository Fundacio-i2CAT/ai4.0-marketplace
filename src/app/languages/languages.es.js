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
					'PROJ-CLIENT':'PROYECTOS',
					'FILTER-PLACEHOLDER-PROJ': 'Filtrar Proyectos',
					'CREAR-PROJ': 'Nuevo Proyecto',
					'PROJ-ARRENCAR': 'LANZAR',
					'PROJ-ATURAR': 'PARAR',
					//estats
					'PENDENT': 'Pendiente',
					'CONFIRMAT': 'Confirmado',
					'ACTIU': 'Activo',
					'PARAT': 'Inactivo',
					'ACTIVAR': 'Habilitar',
					'DESACTIVAR': 'Deshabilitar',
					//new project
					'NEWPROJ': 'NUEVO PROYECTO',
					'LABEL-NOM': 'Nombre',
					'LABEL-SUMARI': 'Sumario',
					'LABEL-DESC': 'Descripción',
					'LABEL-SERV': 'Servicios',
					'BTN-SAVE': 'Crear Proyecto',
					'PLACEHOLDER-NAME': 'Nombre proyecto',
					'PLACEHOLDER-SUMARI': 'Resumen descriptivo',
					'PLACEHOLDER-DESC': 'Descripción del proyecto'

				});
		}]);

})();
				