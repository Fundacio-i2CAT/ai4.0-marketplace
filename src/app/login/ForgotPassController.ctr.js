(function () {
	'use strict';

	angular
		.module('marketplace')
		.controller('ForgotPassController', ForgotPassController);

	ForgotPassController.$inject = [];
	
	function ForgotPassController() {
		var vm = this;

		vm.sendMail = function(credentials) {
			var destiny = credentials.mail;
			var texte = "Texto de prueba";
			/*var link = "mailto:" + destiny
			             + "?cc=myCCaddress@example.com"
			             + "&subject=" + encodeURI("This is my subject")
			             + "&body=" + texte;
			window.location.href = link;*/
		};
	}
})()