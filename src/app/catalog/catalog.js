(function(){
	angular.element('li a').on('click', function(){
		angular.element('li a').removeClass('active');
		angular.element(this).addClass('active');
	})
})();