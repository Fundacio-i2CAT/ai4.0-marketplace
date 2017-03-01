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
					'SRV-SERVEI': 'Servicio',
					'CONSUM-PER-HOUR': 'Consumo por Hora',
					'DETAIL-SECTORS': 'Sectores',
					'DETAIL-LINK': 'Enlace',
					'SRV-INSTANCE': 'Instanciar Servicio',
					'RUN-TIMES': 'Parámetros de Ejecución',
					//projectes
					'PROJ-CLIENT':'PROYECTOS',
					'FILTER-PLACEHOLDER-PROJ': 'Filtrar Proyectos',
					'CREAR-PROJ': 'Nuevo Proyecto',
					'PROJ-ARRENCAR': 'Lanzar',
					'PROJ-ATURAR': 'Parar',
					'PENDING-PROJ': 'Proyectos pendientes de Confirmar',
					'CONFIRM-PROJ': 'Proyectos Confirmados',
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
					'PLACEHOLDER-DESC': 'Descripción del proyecto',
					//register
					'REG-ROLE-LABEL': 'Quiero',
					'REG-ROLE-TITLE': 'Selecciona tu Perfil',
					'REG-ROLE-PROVIDER': 'Ofrecer mis servicios como proveedor de software',
					'REG-ROLE-CLIENT': 'Utilizar los servicios de software que ofrecen en la plataforma',
					'REG-TITLE': 'Registro',
					'REG-SUBTITLE': 'Usuario',
					'REG-MAIL': 'Correo',
					'REG-MAIL-PLACEHOLDER': 'Tu correo electrónico',
					'REG-NAME': 'Nombre',
					'REG-NAME-PLACEHOLDER': 'Tu nombre',
					'REG-SURNAME': 'Apellido',
					'REG-SURNAME-PLACEHOLDER': 'Tu apellido',
					'REG-COMPANY': 	'Empresa',
					'REG-COMPANY-PLACEHOLDER': 	'Tu empresa',
					'REG-LEGAL': 'Responsable legal',
					'REG-LEGAL-LABEL': 'Eres el responsable legal de la empresa?',
					'REG-COMPANY-ADDRESS': 'Dirección empresa',
					'REG-COMPANY-ADDRESS-PLACEHOLDER': 'Dirección de tu empresa',
					'REG-COMPANY-POSITION': 'Cargo',
					'REG-COMPANY-POSITION-PLACEHOLDER': 'Tu cargo en la empresa',
					'REG-COMPANY-PHONE': 'Teléfono',
					'REG-COMPANY-PHONE-PLACEHOLDER': 'Teléfono de la empresa',
					'REG-PASSWORD': 'Contraseña',
					'REG-PASSWORD-PLACEHOLDER': 'Contraseña de tu cuenta',
					'REG-CONFIRM-PASSWORD': 'Confirma contraseña',
					'REG-CONFIRM-PASSWORD-PLACEHOLDER': 'Confirma la contraseña de tu cuenta',
					'REG-USER-ROLE': 'Rol de usuario',
					'REG-TOOLTIP-MAIL': 'ejemplo@gmail.com',
					'REG-PASSWORD-ERROR': 'El Password y la Confirmación de password no coinciden.',
					'REG-EMAIL-ERROR': 'Formato de correo electrónico incorrecto.',
					'REG-CHOOSE-IDENTIFICATION-TYPE': 'Escoge un tipo de identificación',
					'REG-CIF-PLACEHOLDER': 'El CIF de tu empresa sin espacios ni guiones',
					'REG-NIF-PLACEHOLDER': 'Tu NIF sin espacios ni guiones',
					'REG-CIF-ERROR': 'El Cif introduït és incorrecte',
					'REG-NIF-ERROR': 'El Nif introduït és incorrecte',
					'REG-REQUIRED-FIELDS': 'Campos obligatorios',
					'REG-NEEDED-TEXT': 'Es necesario para procesar la solicitud',
					'REG-RECIVE-MAILS': 'Quiero recibir correos electrónicos de la PI4.0 y estoy de acuerdo con que la PI4.0 guarde mis datos personales.',
					'REG-REGISTER-BUTTON': 'Registrarme',
					//log in
					'LOG-TITLE': 'Acceso',
					'LOG-SUBTITLE': 'Usuario',
					'LOG-NAME': 'Nombre',
					'LOG-NAME-PLACEHOLDER': 'Tu nombre',
					'LOG-PASSWORD': 'Contraseña',
					'LOG-PASSWORD-PLACEHOLDER': 'Contraseña de tu cuenta',
					'LOG-LOGIN': 'Acceder',
					'LOG-NOUSER': 'Si no dispones de usuario, haz clic para registrarte',
					'LOG-REGISTER-BUTTON': 'Registro',
					'LOG-CREATE-ACCOUNT': 'Crear cuenta',
					'LOG-FORGOT-PASS': 'He oblidat la contrasenya',
					//forgot
					'FORGOT-SENDMAIL': 'Enviar correo',
					'FORGOT-MAIL-PLACEHOLDER': 'Introduce tu correo',
					'FORGOT-EXPLANATION': 'Introduce tu correo electrónico i te enviaremos un enlace para cambiar la contraseña.',
					//users management
					'USERS-NAV': 'Usuarios',
					'DEL-USER-MSG': '¿ Seguro que quieres eliminar el usuario',
					'USERS-TITLE': 'Gestión de Usuarios',
					'DEL-PROJ-MSG': '¿ Seguro que quieres eliminar el proyecto',
					'USER-DETAIL-TITLE': 'Información del Usuario',
					'USER-DETAIL-PERS-DATA': 'Datos Personales',
					'USER-DETAIL-DESCRIPTION': 'Descripción',
					'USER-DETAIL-CITY': 'Ciudad',
					'USER-DETAIL-COUNTRY': 'Pais',
					'PROFILE-STATUS': 'Estado del Perfil',
					'USER-DETAIL-ACTIVATED': 'Activado',
					'USER-DETAIL-UNACTIVATED': 'Desactivado',
					'EDIT-USER-TITLE': 'Editar Usuario',
					'EDIT-USER-SAVEDATA': 'Guardar Datos',
					'SRV-DETAIL-MSG': 'Es necesario cuenta de Cliente per consumir este Servicio',
					'FILTER-PLACEHOLDER-USERS': 'Filtrar por dato',
					//publicar Servei
					'PUBL-SRV-TITLE': 'Crear Servicio',
					'PUBL-SRV-BTN': 'Crear Nuevo Servicio',
					'PAGINATION-START': 'Inicio',
					'PAGINATION-END': 'Final',
					'PAGINATION-ROWSXPAGE': 'Items',
					'PUBLISH-INFO-BTN': 'Como Crear un Servicio',
					'SERVICE-TYPE': 'Tipo de Servicio',
					'SRV-NAME-PLACE': 'Nombre del Servicio',
					'SRV-DESC-PLACE': 'Descripción del Servicio',
					'SRV-SELECT-DEFAULT': 'Selecciona un tipo de servicio',
					'SRV-SUM-PLACE': 'Sumario del Servicio',
					'CUSTOMER-PARAMS': 'Parámetros del consumidor',
					'CONF': 'Configuración',
					'CONF-PATH': 'Ruta arxivo de configuración',
					'FIELD-NAME': 'Nombre del campo',
					'TYPE-TITLE': 'Tipo',
					'TYPE-PLACE': 'Tipo de dato',
					'FIELD-DESC': 'Descripción del campo',
					'IAAS-SRV': 'Servicio de Infraestructura',
					'IAAS-SRV-PLACE': 'Selecciona un Servicio de Infraestructura',
					'SELECT-FLAVOR': 'Selecciona un Flavor',
					'MEMORY-LABEL': 'Memoria MB',
					'DISK-LABEL': 'Disco',
					'CPUS-LABEL': 'CPUs',
					'ACTIVATED-LABEL': 'Activado',
					'SELECTED-FLAVOR': 'Flavor Seleccionado',
					'RUNTIME-PARAMS': 'Parámetros de Runtime',
					'DISC-IMAGE': 'Imagen de Disco',
					'DISC-IMAGE-TYPE': 'Tipo de imagen de Disco',
					'DISC-IMAGE-TYPE-HELP': 'Formatos de imagen de Disco',
					//create Service
					'GENERAL-DATA': 'Datos Generales',
					'PARAMS': 'Parámetros',
					'PARAM': 'Parámetro',
					'INFRASTRUCT': 'Infraestructura',
					'PRICE': 'Precios',
					'INFO': 'Información',
					'BASIC-INFO': 'Información básica',
					'IMAGE': 'Imagen',
					'CONSUME-SRV': 'Tarifas de Consumo',
					'SRV-INSTANT': 'Instanciación del Servicio',
					'SRV-STABLISH': 'Arrancar Servicio',
					'HOUR-PRICE': 'Precio por Hora',
					'RATING': 'Tarifa horaria',
					//own projects
					'NO-PUBLISH-SRV': 'Servicios no publicados',
					'PUBLISH-SRV': 'Servicios publicados',
					'OWN-SRVS': 'Servicios propios',
					'EXIST-PROJ': 'Proyectos guardados',
					'EXIST-SRV': 'Servicios guardados'



				});
		}]);

})();
