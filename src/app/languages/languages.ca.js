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
					'LOG-CREATE-ACCOUNT': 'Crear comte',
					'LOG-FORGOT-PASS': 'He olvidado la contraseña',
					//forgot
					'FORGOT-SENDMAIL': 'Enviar correu',
					'FORGOT-MAIL-PLACEHOLDER': 'Introdueix el teu correu',
					'FORGOT-EXPLANATION': 'Introdueix el teu Correu electrònic i t\'enviarem un enllaç per canviar la contrasenya.'

				})
				.preferredLanguage('CAT');
		}]);	

})();


