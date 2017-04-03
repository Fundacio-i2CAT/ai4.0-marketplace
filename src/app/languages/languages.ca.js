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
					'SRV-SERVEI': 'Servei',
					'CONSUM-PER-HOUR': 'Consum per Hora',
					'DETAIL-SECTORS': 'Sectors',
					'DETAIL-LINK': 'Enllaç',
					'SRV-INSTANCE': 'Instanciar Servei',
					'RUN-TIMES': 'Paràmetres d\'Execució',
					//projectes
					'PROJ-CLIENT':'PROJECTES',
					'FILTER-PLACEHOLDER-PROJ': 'Filtrar Projectes',
					'CREAR-PROJ': 'Nou Projecte',
					'PROJ-ARRENCAR': 'Arrencar',
					'PROJ-ATURAR': 'Aturar',
					'PENDING-PROJ': 'Projectes pendents de Confirmar',
					'CONFIRM-PROJ': 'Projectes Confirmats',
					'REACCEPT-PROJ': 'Reaprovar',
					//estats
					'PENDENT': 'Pendent',
					'CONFIRMAT': 'Confirmat',
					'ACTIU': 'Actiu',
					'PARAT': 'Inactiu',
					'ACTIVAR': 'Confirmar',
					'DESACTIVAR': 'Desactivar',
					'DENEGAT': 'Denegat',
					//new project
					'NEWPROJ': 'NOU PROJECTE',
					'LABEL-NOM': 'Nom',
					'LABEL-SUMARI': 'Sumari',
					'LABEL-DESC': 'Descripció',
					'LABEL-SERV': 'Serveis',
					'BTN-SAVE': 'Crear Projecte',
					'PLACEHOLDER-NAME': 'Nom projecte',
					'PLACEHOLDER-SUMARI': 'Resum descriptiu',
					'PLACEHOLDER-DESC': 'Descripció del projecte',
					//register
					'REG-ROLE-LABEL': 'Vull',
					'REG-ROLE-TITLE': 'Selecciona el teu Perfil',
					'REG-ROLE-PROVIDER': 'Oferir els meus serveis com a proveïdor de software',
					'REG-ROLE-CLIENT': 'Utilitzar els serveis de software que oferten en la plataforma',
					'REG-TITLE': 'Registre',
					'REG-SUBTITLE': 'Usuari',
					'REG-MAIL': 'Correu',
					'REG-MAIL-PLACEHOLDER': 'El teu correu electrònic',
					'REG-NAME': 'Nom',
					'REG-NAME-PLACEHOLDER': 'El teu nom',
					'REG-SURNAME': 'Cognom',
					'REG-SURNAME-PLACEHOLDER': 'El teu cognom',
					'REG-COMPANY': 	'Empresa',
					'REG-COMPANY-PLACEHOLDER': 	'La teva empresa',
					'REG-LEGAL': 'Responsable legal',
					'REG-LEGAL-LABEL': 'Ets el responsable legal de l\'empresa?',
					'REG-COMPANY-ADDRESS': 'Adreça empresa',
					'REG-COMPANY-ADDRESS-PLACEHOLDER': 'Adreça de la teva empresa',
					'REG-COMPANY-POSITION': 'Càrrec',
					'REG-COMPANY-POSITION-PLACEHOLDER': 'El teu càrrec a l\'empresa',
					'REG-COMPANY-PHONE': 'Telèfon',
					'REG-COMPANY-PHONE-PLACEHOLDER': 'Telèfon de l\'empresa',
					'REG-PASSWORD': 'Contrasenya',
					'REG-PASSWORD-PLACEHOLDER': 'Contrasenya del teu compte',
					'REG-CONFIRM-PASSWORD': 'Confirma contrasenya',
					'REG-CONFIRM-PASSWORD-PLACEHOLDER': 'Confirma la contrasenya del teu compte',
					'REG-USER-ROLE': 'Rol d\'usuari',
					'REG-TOOLTIP-MAIL': 'example@gmail.com',
					'REG-PASSWORD-ERROR': 'El Password i la Confirmació de password no coincideixen.',
					'REG-EMAIL-ERROR': 'Format de correu electrònic incorrecte.',
					'REG-CHOOSE-IDENTIFICATION-TYPE': 'Escull un tipus d\'identificació',
					'REG-CIF-PLACEHOLDER': 'El CIF de la teva empresa sense espais ni guions',
					'REG-NIF-PLACEHOLDER': 'El teu NIF sense espais ni guions',
					'REG-CIF-ERROR': 'El Cif introducido es incorrecto',
					'REG-NIF-ERROR': 'El Nif introducido es incorrecto',
					'REG-REQUIRED-FIELDS': 'Camps obligatoris',
					'REG-NEEDED-TEXT': 'És necessari per processar la sol·licitud.',
					'REG-RECIVE-MAILS': 'Vull rebre correus electrònics des de la PI4.0 i estic d’acord en que la PI4.0 guardi les meves dades personals.',
					'REG-REGISTER-BUTTON': 'Registrar-me',
					//log in
					'LOG-TITLE': 'Accés',
					'LOG-SUBTITLE': 'Usuari',
					'LOG-NAME': 'Nom',
					'LOG-NAME-PLACEHOLDER': 'El teu nom',
					'LOG-PASSWORD': 'Contrasenya',
					'LOG-PASSWORD-PLACEHOLDER': 'Contrasenya del teu compte',
					'LOG-LOGIN': 'Accedir',
					'LOG-NOUSER': 'Si no disposes d\'usuari, fes clic per registrar-te',
					'LOG-REGISTER-BUTTON': 'Registre',
					'LOG-CREATE-ACCOUNT': 'Crear compte',
					'LOG-FORGOT-PASS': 'He olvidado la contraseña',
					//forgot
					'FORGOT-SENDMAIL': 'Enviar correu',
					'FORGOT-MAIL-PLACEHOLDER': 'Introdueix el teu correu',
					'FORGOT-EXPLANATION': 'Introdueix el teu Correu electrònic i t\'enviarem un enllaç per canviar la contrasenya.',
					//users management
					'USERS-NAV': 'Usuaris',
					'DEL-USER-MSG': 'Segur que vols eliminar l\'usuari',
					'USERS-TITLE': 'Gestió d\'Usuaris',
					'DEL-PROJ-MSG': 'Segur que vols eliminar el projecte',
					'USER-DETAIL-TITLE': 'Informació de l\'Usuari',
					'USER-DETAIL-PERS-DATA': 'Dades Personals',
					'USER-DETAIL-DESCRIPTION': 'Descripció',
					'USER-DETAIL-CITY': 'Ciutat',
					'USER-DETAIL-COUNTRY': 'País',
					'PROFILE-STATUS': 'Estat del Perfil',
					'USER-DETAIL-ACTIVATED': 'Activat',
					'USER-DETAIL-UNACTIVATED': 'Desactivat',
					'EDIT-USER-TITLE': 'Editar Usuari',
					'EDIT-USER-SAVEDATA': 'Guardar Dades',
					'SRV-DETAIL-MSG': 'És necessari compte de Client per consumir aquest Servei',
					'FILTER-PLACEHOLDER-USERS': 'Filtrar per dada',
					//publicar Servei
					'PUBL-SRV-TITLE': 'Crear Servei',
					'PUBL-SRV-BTN': 'Crear Nou Servei',
					'PAGINATION-START': 'Inici',
					'PAGINATION-END': 'Final',
					'PAGINATION-ROWSXPAGE': 'Items',
					'PUBLISH-INFO-BTN': 'Com Crear un Servei',
					'SERVICE-TYPE': 'Tipus de Servei',
					'SRV-NAME-PLACE': 'Nom del Servei',
					'SRV-DESC-PLACE': 'Descripció del Servei',
					'SRV-SELECT-DEFAULT': 'Selecciona un tipus de servei',
					'SRV-SUM-PLACE': 'Sumari del Servei',
					'CUSTOMER-PARAMS': 'Paràmetres del consumidor',
					'CONF': 'Configuració',
					'CONF-PATH': 'Ruta arxiu de configuració',
					'FIELD-NAME': 'Nom del camp',
					'TYPE-TITLE': 'Tipus',
					'TYPE-PLACE': 'Tipus de dada',
					'FIELD-DESC': 'Descripció del camp',
					'IAAS-SRV': 'Servei d\'Infraestructura',
					'IAAS-SRV-PLACE': 'Selecciona un Servei d\'Infraestructura',
					'SELECT-FLAVOR': 'Selecciona un Flavor',
					'MEMORY-LABEL': 'Memòria MB',
					'DISK-LABEL': 'Disc',
					'CPUS-LABEL': 'CPUs',
					'ACTIVATED-LABEL': 'Activat',
					'SELECTED-FLAVOR': 'Flavor Seleccionat',
					'RUNTIME-PARAMS': 'Paràmetres de Runtime',
					'DISC-IMAGE': 'Imatge de Disc',
					'DISC-IMAGE-TYPE': 'Tipus d\'imatge',
					'DISC-IMAGE-TYPE-HELP': 'Formats d\'imatge de Disc',
					//create Service tabs
					'GENERAL-DATA': 'Dades Generals',
					'PARAMS': 'Paràmetres',
					'PARAM': 'Paràmetre',
					'INFRASTRUCT': 'Infraestructura',
					'PRICE': 'Preus',
					'INFO': 'Informació',
					'BASIC-INFO': 'Informació bàsica',
					'IMAGE': 'Imatge',
					'CONSUME-SRV': 'Tarifes de Consum',
					'SRV-INSTANT': 'Instanciació del Servei',
					'SRV-STABLISH': 'Arrancar Servei',
					'HOUR-PRICE': 'Preu per Hora',
					'RATING': 'Tarifa horària',
					//own projects
					'NO-PUBLISH-SRV': 'Serveis no publicats',
					'PUBLISH-SRV': 'Serveis publicats',
					'OWN-SRVS': 'Serveis propis',
					'EXIST-PROJ': 'Projectes guardats',
					'EXIST-SRV': 'Serveis guardats',
					//consum register
					'CONSUM-DATA': 'Dades de Consum',
					'CUSTOMER': 'CLIENT',
					'CONSUM-PROJ': 'PROJECTE',
					'CONSUM-DATE1': 'Data d\'Inici',
					'CONSUM-DATE2': 'Data Final',
					'CONSUM-SEND': 'Obenir Consum',
					'TIME-LAPSE': 'Interval',
					'ELAPSED-TIME': 'Temps transcorregut',
					'TOTAL-ELAPSED-TIME': 'Temps total transcorregut',
					'TOTAL-MINUTES': 'Minutos totales',
					'NO-INSTANCE': 'Sense Instància',
					'NO-CONSUM': 'Sense Consum',
					'NO-CONSUM-MSSG': 'No hi ha enregistrat cap consum d\'aquest Servei en aquest periode',
					'PERIOD-BUTTON': 'Canviar Dates'



				})
				.preferredLanguage('CAT');
		}]);

})();
